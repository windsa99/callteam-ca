module.exports = function (eleventyConfig) {
  // Copy the assets folder as-is: CSS, logo, favicon, images
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("readableDate", (value) => {
    if (!value) return "";
    const date = value instanceof Date
      ? value
      : new Date(`${String(value).slice(0, 10)}T00:00:00Z`);

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC"
    }).format(date);
  });

  eleventyConfig.addFilter("sitemapDate", (value) => {
    if (!value) return "";
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));

  eleventyConfig.addFilter("scriptBySlug", (slug, scripts = []) => {
    return scripts.find((script) => script.slug === slug);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
