import type { StorybookConfig } from "@storybook/react-webpack5";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ['../src/assets'],
  webpackFinal: (config) => {
    let rules = config.module?.rules || [];
    rules = [
      ...rules,
      {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: { injectType: 'styleTag' }
          },
          { loader: 'css-modules-typescript-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]-[hash:8]'
              }
            }
          },
          'sass-loader'
        ]
      }
    ];
    const newConfig = {
      ...config,
      module: {
        ...config?.module,
        rules: [...rules],
      }
    };

    return newConfig;
  }
};
export default config;
