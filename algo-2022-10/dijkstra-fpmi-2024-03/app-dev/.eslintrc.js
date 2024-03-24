module.exports = {
    "env": {
        "browser": true,
        "es6": true,
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module",
    },
    "plugins": [
        "@typescript-eslint",
        "prettier",
    ],
    "rules": {
        "semi": ["warn", "always"],
        "prettier/prettier": [
            "error",
            {
                "endOfLine": "auto"
            }
        ],
        "@typescript-eslint/explicit-function-return-type": 0,
        "react/prop-types": 0
    }
}; 
