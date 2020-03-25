module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["eslint-plugin-prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    allowShortCircuit: true,
    allowTernary: true,
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    camelcase: "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "object-curly-newline": [
      "error",
      {
        ObjectExpression: "always",
        ObjectPattern: { multiline: true },
        ImportDeclaration: "never",
        ExportDeclaration: { multiline: true, minProperties: 3 }
      }
    ]
  }
};
