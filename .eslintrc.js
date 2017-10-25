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
        "object-curly-spacing": [2, "never"],
        "comma-dangle": [2, "never"],
        "arrow-parens": [2, "as-needed"],
        "block-spacing": ["error", "never"]
      }
};