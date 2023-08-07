const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    console.log('argv=', argv);
    const plugins =
            [
                  new CopyPlugin({
                      patterns: [
                          {
                              from: 'bundled/index.html',
                              to: path.join(__dirname, '/demo-dist/index.html')
                          },
                          { from: 'bundled/shower', to: path.join(__dirname, '/demo-dist/shower') },
                          { from: 'bundled/demo-static', to: path.join(__dirname, '/demo-dist/demo-static') }
                        //   { from: 'bundled/app-static', to: path.join(__dirname, '/demo-dist/app-static') }
                        //   { from: '../app-dev/temp/ui-dist', to: path.join(__dirname, '/demo-dist/app-static') }
                    ]
                  })
              ];

    const config = {
        entry: './src/index.js',
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            alias: {
                types: path.resolve(__dirname, 'src/types')
            }
        },
        output: {
            path: path.join(__dirname, '/temp'),
            filename: 'index.js'
        },
        module: {
            rules: []
        },
        plugins
    };

    return config;
};

