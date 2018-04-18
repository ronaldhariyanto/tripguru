const withSass = require('@zeit/next-sass')
module.exports = withSass({
  sassLoaderOptions: {
    includePaths: ["node_modules/foundation-sites/scss"]
  }
})