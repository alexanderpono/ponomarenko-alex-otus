const webpackRules = require("../webpack.rules");
const custom = require('../webpack.config.js');

module.exports = {
  stories: ['../src/**/*.stories.tsx', '../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource',
  ],
  webpackFinal: (config) => {
    const deleteCssRule = (rules) => {
      return rules.filter( (data) => {
        if (/css/.test( String( data.test ) )) {
          return false;
        }
        return true;
      });
    };

    let rules = [
      ...deleteCssRule(config.module.rules),
      {
        test: /\.stories\.tsx$/,
        loaders: [
          {
            loader: require.resolve('@storybook/source-loader'),
            options: { parser: 'typescript' },
          },
        ],
        enforce: 'pre',
      },
      {
        test: /\.(stories|story)\.[tj]sx?$/,
        loader: require.resolve('@storybook/source-loader'),
        exclude: [/node_modules/],
        enforce: 'pre',
      }
    ];

    const result = {
      ...config,
      resolve: custom.resolve,
      module: {
        ...config.module,
        rules: [...rules, ...webpackRules],
      },
    };

    return result;
  },
};
