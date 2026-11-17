const escapeCsv = value => '"' + String(value).replaceAll('"', '""') + '"';

module.exports = class {
  data() {
    return {
      permalink: '/assets/downloads/2027-b2b-lead-generation-agency-prices.csv',
      eleventyExcludeFromCollections: true,
    };
  }

  render({ leadGenerationPricingReport: report }) {
    const rows = [['Agency', 'Offer', 'Rate as published', 'Price status', 'Billing and term', 'Scope and charges', 'Checked date', 'Official source']];
    for (const provider of report.providers) {
      for (const offer of provider.offers) {
        const [name, rate, status, terms, scope, sourceIndex] = offer;
        rows.push([provider.name, name, rate, status, terms, scope, report.checkedDate, provider.sources[sourceIndex][1]]);
      }
    }
    return '\uFEFF' + rows.map(row => row.map(escapeCsv).join(',')).join('\r\n') + '\r\n';
  }
};
