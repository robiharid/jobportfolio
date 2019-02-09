module.exports = {
  bracketSpacing: true,
  printWidth: 100,
  semi: true,
  singleQuote: false,
  trailingComma: 'none',
  arrowParens: 'always',
  parser: 'babylon',
  overrides: [
    {
      files: 'package*.json',
      options: {
        printWidth: 1000
      }
    }
  ]
};
