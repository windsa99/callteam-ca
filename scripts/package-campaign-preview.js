/* QA-only packaging: NODE_PATH points to the separate jsdom tools directory. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const repo = path.resolve(__dirname, '..');
const site = path.join(repo, '_site');
const out = process.argv[2];
assert(out && path.isAbsolute(out), 'Supply an absolute output HTML path.');
const dom = new JSDOM(fs.readFileSync(path.join(site, 'b2b-outbound-campaign-planner/index.html'), 'utf8'));
const doc = dom.window.document;
doc.title = 'CallTeam Campaign Preview — Sandbox';
doc.querySelector('meta[name="robots"]').content = 'noindex, nofollow';
doc.querySelector('link[rel="canonical"]').remove();
doc.querySelectorAll('script').forEach(node => {
  if (!node.src && node.textContent.includes('clarity.ms')) node.remove();
});
const config = doc.createElement('script');
config.textContent = 'window.CALLTEAM_LOCAL_PREVIEW = true;';
doc.head.append(config);
doc.querySelectorAll('link[rel="stylesheet"]').forEach(node => {
  const href = node.getAttribute('href');
  if (!href.startsWith('/')) return; // Retain the site's public font stylesheet.
  const style = doc.createElement('style');
  style.textContent = fs.readFileSync(path.join(site, href), 'utf8');
  node.replaceWith(style);
});
const mime = file => /\.png$/i.test(file) ? 'image/png' : /\.svg$/i.test(file) ? 'image/svg+xml' : 'image/jpeg';
doc.querySelectorAll('img[src^="/"],link[rel="icon"][href^="/"]').forEach(node => {
  const attribute = node.tagName === 'IMG' ? 'src' : 'href';
  const url = node.getAttribute(attribute);
  const bytes = fs.readFileSync(path.join(site, url));
  node.setAttribute(attribute, 'data:' + mime(url) + ';base64,' + bytes.toString('base64'));
});
doc.querySelectorAll('script[src]').forEach(node => {
  const src = node.getAttribute('src');
  assert(src.startsWith('/'), 'Unexpected external executable script: ' + src);
  node.textContent = fs.readFileSync(path.join(site, src), 'utf8').replace(/<\/script/gi, '<\\/script');
  node.removeAttribute('src'); node.removeAttribute('defer');
});
doc.querySelectorAll('a[href^="/"]').forEach(node => {
  const href = node.getAttribute('href');
  if (href === '/b2b-outbound-campaign-planner/') node.setAttribute('href', '#cp-offer');
  else { node.setAttribute('href', 'https://www.callteam.ca' + href); node.target = '_blank'; node.rel = 'noopener'; }
});
const form = doc.querySelector('.contact-form');
assert(form, 'Expected inherited contact form.');
form.action = '#contact';
const submit = form.querySelector('[type="submit"]');
submit.disabled = true; submit.textContent = 'Sending disabled in this sandbox preview';
const protection = doc.createElement('script');
protection.textContent = 'document.addEventListener("submit", function (event) { event.preventDefault(); event.stopImmediatePropagation(); }, true);';
doc.head.append(protection);
const banner = doc.createElement('aside');
banner.setAttribute('aria-label', 'Sandbox preview');
banner.className = 'sandbox-preview-banner';
banner.innerHTML = '<strong>CallTeam sandbox preview</strong><span>Interactive planning works here. Nothing is deployed. Contact sending is disabled; resource and booking links open the live services.</span>';
doc.body.prepend(banner);
const style = doc.createElement('style');
style.textContent = '.sandbox-preview-banner{display:flex;flex-wrap:wrap;gap:6px 18px;align-items:center;padding:12px 24px;background:#111;color:#fff;border-bottom:3px solid #FF5A1F;font:13px/1.5 Arial,sans-serif}.sandbox-preview-banner span{max-width:1000px}@media print{.sandbox-preview-banner{display:none}}';
doc.head.append(style);
fs.writeFileSync(out, '<!DOCTYPE html>\n' + doc.documentElement.outerHTML + '\n');
console.log(JSON.stringify({ file: out, bytes: fs.statSync(out).size, embeddedScripts: doc.querySelectorAll('script:not([type="application/ld+json"])').length, analyticsRemoved: !doc.documentElement.outerHTML.includes('clarity.ms'), submissionsDisabled: true }));
