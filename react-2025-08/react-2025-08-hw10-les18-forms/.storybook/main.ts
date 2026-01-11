import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

interface Cfg {
    module: {
        rules: Rule[];
    },
    resolve: {
        plugins?: []
    }
}
interface Rule {
    test: RegExp;
    exclude?: unknown;
    use: unknown[];
}
const config = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    staticDirs: [path.resolve(__dirname, 'static')],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/preset-scss",
        "@storybook/addon-mdx-gfm"
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    webpackFinal: (config: Cfg) => {
        let rules = config.module?.rules || [];

        rules[7] = {
            test: /\.scss$/,
            use: [
                {
                    loader: 'style-loader',
                    options: { injectType: 'styleTag' }
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: {
                            localIdentName: '[local]-[hash:8]'
                        }
                    }
                },
                {
                    loader: 'sass-loader',
                    options: undefined
                }
            ]
        }
        rules = [
            ...rules,
            {
                test: /\.sass$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: undefined
                    },
                    {
                        loader: 'css-loader',
                        options: undefined
                    },
                    {
                        loader: 'sass-loader',
                        options: undefined
                    }
                ]
            }
        ];
        const newConfig = {
            ...config,
            module: {
                ...config?.module,
                rules: [...rules],
            },
            resolve: {
                ...config?.resolve,
                plugins: [
                    ...(config.resolve.plugins || []),
                    new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, '../tsconfig.json') }),
                ]
            }
        };

        return newConfig;
    }
};
export default config;
