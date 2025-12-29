const collections = require('./src/_data/collections.js');

module.exports = function(eleventyConfig) {
  // Passthrough copies
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  // Watch targets
  eleventyConfig.addWatchTarget("src/css");
  eleventyConfig.addWatchTarget("src/js");

  // Add JSON filter
  eleventyConfig.addFilter("json", function(value) {
    return JSON.stringify(value);
  });

  // Make collections data available globally
  const collectionsData = collections();
  eleventyConfig.addGlobalData("films", collectionsData.films);
  eleventyConfig.addGlobalData("featuredFilms", collectionsData.featuredFilms);
  eleventyConfig.addGlobalData("testimonials", collectionsData.testimonials);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};

