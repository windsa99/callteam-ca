const awards = require('./awards.json');
module.exports = {
  names: Object.values(awards).map(award => `${award.title} | ${award.programme} | ${award.edition}`)
};
