module.exports = {
  extends: ["./node_modules/poetic/config/eslint/eslint-config.js"],
  // Add custom rules here
  rules: {
    "react/prop-types": 0,
    "consistent-return": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  }
};
