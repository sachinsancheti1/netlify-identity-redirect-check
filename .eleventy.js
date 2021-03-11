const fs = require('fs');
const { DateTime } = require('luxon');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const CleanCSS = require('clean-css');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode(
    'coverImages',
    require('./_site/utils/shortcodes/coverImages.js')
  );
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy('./_site/images');
  eleventyConfig.addPassthroughCopy('./_site/_redirects');
  eleventyConfig.addPassthroughCopy('./_site/_headers');
  eleventyConfig.addPassthroughCopy('./_site/js');
  eleventyConfig.addPassthroughCopy('./_site/css');

  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addLayoutAlias('properties', 'properties.njk');
  eleventyConfig.addLayoutAlias('dev', 'dev.njk');
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addWatchTarget('./css/');
  eleventyConfig.addWatchTarget('css/');

  eleventyConfig.addFilter('dateDisplay', require('./_site/utils/filters/date.js'));

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addTransform('cleancss', require('./_site/utils/css-clean.js'));
  eleventyConfig.addTransform('minify-html', require('./_site/utils/minify-html.js'));
  eleventyConfig.addTransform('minifyjs', require('./_site/utils/minifyjs.js'));

  // compress and combine js files
  eleventyConfig.addFilter('jsmin', function (code) {
    const UglifyJS = require('uglify-js');
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log('UglifyJS error: ', minified.error);
      return code;
    }
    return minified.code;
  });
  eleventyConfig.addFilter('cssmin', function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: '_site',
      data: '_data',
      includes: '_includes',
      layouts: '_includes/layouts',
      output: 'dist',
    },
  };
};
