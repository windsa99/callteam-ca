const catalog = require('./scriptCheckCatalog');
// Escaping '<' prevents a published example from closing an inline script element.
module.exports = JSON.stringify(catalog).replace(/</g, '\\u003c');
