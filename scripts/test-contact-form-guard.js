const fs = require("fs");
const path = require("path");
const assert = require("assert/strict");
const { checkPage } = require("./check-contact-forms");
const html = fs.readFileSync(path.resolve(__dirname, "../_site/index.html"), "utf8");
const form = html.match(/<form class="contact-form"[\s\S]*?<\/form>/)[0];
const cases = [
  ["missing shared form", html.replace(form, "")],
  ["duplicate form", html + form],
  ["different endpoint", html.replace('action="https://formspree.io/f/xbdvejea"', 'action="https://example.invalid/form"')],
  ["GET submission", html.replace('method="POST"', 'method="GET"')],
  ["validation disabled", html.replace('class="contact-form"', 'class="contact-form" novalidate')],
  ["email type weakened", html.replace('type="email"', 'type="text"')],
  ["missing honeypot", html.replace('name="_gotcha"', 'name="unused"')],
  ["filled honeypot", html.replace('name="_gotcha"', 'name="_gotcha" value="autofilled"')],
  ["disabled honeypot", html.replace('name="_gotcha"', 'name="_gotcha" disabled')],
  ["required honeypot", html.replace('name="_gotcha"', 'name="_gotcha" required')],
  ["visible honeypot", html.replace('class="contact-form-trap" hidden', 'class="contact-form-trap"')],
  ["submit override", html.replace('class="form-submit"', 'class="form-submit" formaction="https://example.invalid"')],
  ["extra submission endpoint", html + '<form action="https://example.invalid" method="POST"></form>']
];
for (const name of ["name", "company", "email", "message"]) {
  cases.push([`${name} is optional`, html.replace(new RegExp(`(<(?:input|textarea)[^>]*name="${name}"[^>]*?) required`), "$1")]);
  cases.push([`${name} disabled`, html.replace(`name="${name}"`, `name="${name}" disabled`)]);
}
checkPage(html, "unchanged-homepage");
checkPage(html + '<form action="#local-search"><input name="q"></form>', "local-search-allowed");
for (const [name, broken] of cases) {
  assert.notEqual(broken, html, `${name}: fixture did not change`);
  assert.throws(() => checkPage(broken, name), undefined, `${name}: guard failed to catch regression`);
}
console.log(`Contact guard regression checks passed: ${cases.length} broken-form cases rejected; current form and local search accepted. These are markup tests, not Formspree submission tests.`);
