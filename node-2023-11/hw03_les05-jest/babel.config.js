module.exports = {
    plugins: ['@babel/plugin-transform-class-properties'],
    env: {
        production: {
            plugins: []
        },
        development: {
            plugins: []
        }
    }
};
