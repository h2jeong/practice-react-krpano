const { addWebpackAlias, override } = require('customize-cra');
const addLessLoader = require('customize-cra-less-loader');
const path = require('path');

module.exports = override(
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#cb2b83'
        }
      }
    }
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  })
);
