module.exports = {
    plugins: ['@babel/plugin-proposal-class-properties'],
    env: {
        production: {
            plugins: []
        },
        development: {
            plugins: []
        }
    }
};
