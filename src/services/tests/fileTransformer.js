const { resolve, relative } = require('path')

module.exports = {
  process: (src, filename) =>
    `module.exports = { uri: ${JSON.stringify(relative(resolve(__dirname, '../../../'), filename))} }`,
}
