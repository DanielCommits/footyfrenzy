module.exports = {
  env: {
    es2021: true,
    node: true, // Ensures that 'module' and 'require' are available
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module", // 'module' allows modern syntax such as `import/export`
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
  },
  globals: {
    // Explicitly define CommonJS-related globals:
    "module": "readonly", // Prevents any mutation to 'module'
    "require": "readonly", // Makes 'require' readonly
    "exports": "readonly", // Makes 'exports' readonly
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
};
