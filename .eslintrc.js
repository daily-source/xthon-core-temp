module.exports = {
  parserOptions: {
    sourceType: "module"
  },
  extends: "standard",

  // required to lint *.vue files
  plugins: [
    "html"
  ],
  parser: "babel-eslint",
  settings: {
    "import/resolver": {
      "webpack": {
        "config": "build/webpack.base.conf.js"
      }
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  // add your custom rules here
  rules: {
    // don"t allow semicolons
    "semi": ["error", "never"],

    // don"t require comma in the last line of an object/dictionary declaration
    "comma-dangle": ["error", "never"],

    // ignore max-len for comments
    "max-len": [
      "error",
      { "code": 380, "ignoreComments": true, "ignoreTrailingComments": true, "ignoreUrls": true, "ignoreStrings": true }
    ],

    "no-mixed-operators": 0,

    // force space after and before curly braces in object/dict declarations
    "object-curly-spacing": ["error", "always"],

    // allow debugger; instruction during development
    "no-debugger": process.env.NODE_ENV === 'production' ? 2 : 0,

    // force "===" in comparisons when ambiguous
    "eqeqeq": ["error", "smart"],

    // force double quotes
    "quotes": ["error", "double"],

    "indent": ["error", 2],
    "no-tabs": 0,

    "require-jsdoc": 0,

    "prefer-promise-reject-errors": 0,

    "new-cap": ["error", { "capIsNew": false }],

    "no-control-regex": 0
  }
}