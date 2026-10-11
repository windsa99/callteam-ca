const fs = require("fs");
const path = require("path");
const assert = require("assert/strict");
const policy = require("../config/contact-form-policy.json");

// These checks inspect generated HTML. They do not verify or configure Formspree.
function attributes(tag) {
  const values = {};
  const body = tag.replace(/^<\/?[\w-]+/, "").replace(/\/?\s*>$/, "");
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const match of body.matchAll(pattern)) {
    const name = match[1].toLowerCase();
    assert(!Object.hasOwn(values, name), `duplicate ${name} attribute`);
    values[name] = match[2] ?? match[3] ?? match[4] ?? "";
  }
  return values;
}

function checkPage(html, filename) {
  const markup = html.replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "");
  const forms = [...markup.matchAll(/(<form\b[^>]*>)([\s\S]*?)<\/form\s*>/gi)]
    .map((match) => ({ attrs: attributes(match[1]), body: match[2] }));
  const contact = forms.filter(({ attrs }) => (attrs.class || "").split(/\s+/).includes("contact-form"));
  assert.equal(contact.length, 1, `${filename}: expected exactly one shared contact form`);
  const { attrs, body } = contact[0];
  assert.equal(attrs.action, policy.productionEndpoint, `${filename}: contact endpoint changed`);
  assert.equal((attrs.method || "").toUpperCase(), "POST", `${filename}: form must use POST`);
  assert(!Object.hasOwn(attrs, "novalidate"), `${filename}: browser validation disabled`);
  assert(!/<fieldset\b[^>]*\bdisabled(?:\s|=|>)/i.test(body), `${filename}: form fields disabled`);
  const controls = [...body.matchAll(/<(input|textarea|button|select)\b[^>]*>/gi)]
    .map(([tag, type]) => ({ tag: type.toLowerCase(), attrs: attributes(tag) }));
  for (const { attrs: control } of controls) {
    assert(!Object.hasOwn(control, "formaction"), `${filename}: control overrides contact endpoint`);
    assert(!Object.hasOwn(control, "formmethod"), `${filename}: control overrides POST method`);
    assert(!Object.hasOwn(control, "formnovalidate"), `${filename}: control bypasses validation`);
    assert(!Object.hasOwn(control, "form"), `${filename}: control assigned to another form`);
  }
  for (const [name, rule] of Object.entries(policy.fields)) {
    const matches = controls.filter(({ attrs: control }) => control.name === name);
    assert.equal(matches.length, 1, `${filename}: expected one ${name} field`);
    const { tag, attrs: control } = matches[0];
    assert(!Object.hasOwn(control, "disabled"), `${filename}: ${name} field disabled`);
    assert(!Object.hasOwn(control, "readonly"), `${filename}: ${name} field is read-only`);
    assert(Object.hasOwn(control, "required") && rule.required, `${filename}: ${name} must be required`);
    assert.equal(tag, name === "message" ? "textarea" : "input", `${filename}: wrong ${name} control`);
    if (tag === "input") assert.equal(control.type, rule.type, `${filename}: wrong ${name} type`);
  }
  const traps = controls.filter(({ attrs: control }) => control.name === policy.honeypot);
  assert.equal(traps.length, 1, `${filename}: missing or duplicate honeypot`);
  const trap = traps[0].attrs;
  assert(!Object.hasOwn(trap, "disabled") && !Object.hasOwn(trap, "required"), `${filename}: honeypot must remain optional and enabled`);
  assert.equal(trap.value || "", "", `${filename}: honeypot must be empty`);
  assert.equal(trap.tabindex, "-1", `${filename}: honeypot must stay out of keyboard navigation`);
  assert.equal(trap.autocomplete, "off", `${filename}: honeypot autocomplete must be off`);
  const trapWrapper = body.match(/(<div\b[^>]*class="[^"]*\bcontact-form-trap\b[^"]*"[^>]*>)([\s\S]*?)<\/div>/i);
  assert(trapWrapper, `${filename}: honeypot wrapper missing`);
  const wrapper = attributes(trapWrapper[1]);
  assert(Object.hasOwn(wrapper, "hidden") && wrapper["aria-hidden"] === "true", `${filename}: honeypot must remain hidden`);
  assert(trapWrapper[2].includes(`name="${policy.honeypot}"`), `${filename}: honeypot is outside hidden wrapper`);
  for (const form of forms) {
    if (form !== contact[0]) {
      assert((form.attrs.action || "").startsWith("#") && (form.attrs.method || "get").toLowerCase() === "get",
        `${filename}: new submission form needs an explicit security review`);
    }
  }
}

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : entry.name.endsWith(".html") ? [file] : [];
  });
}

if (require.main === module) {
  const directory = path.resolve(__dirname, "../_site");
  const files = htmlFiles(directory);
  assert(files.length > 0, "No generated pages found; build the site first");
  for (const file of files) checkPage(fs.readFileSync(file, "utf8"), path.relative(directory, file));
  console.log(`Contact markup guard passed: ${files.length} pages share one endpoint, four required fields and an empty hidden honeypot. Formspree server settings require separate verification.`);
}

module.exports = { checkPage };
