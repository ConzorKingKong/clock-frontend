module.exports = {
    "extends": "airbnb",
    "globals": {
        "document": true,
        "window": true,
        "Worker": true,
        "Notification": true,
        "onmessage": true,
        "onerror": true,
        "postMessage": true
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/forbid-prop-types": [0, "never"],
        "object-curly-spacing": [2, "never"],
        "comma-dangle": [2, "never"],
        "arrow-parens": [2, "as-needed"],
        "block-spacing": ["error", "never"],
        "import/no-webpack-loader-syntax": [0, "never"],
        "import/no-unresolved": [0, "never"],
        "import/extensions": [0, "never"],
        "jsx-a11y/media-has-caption": [0, "never"]
      }
};