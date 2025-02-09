module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'selector-pseudo-element-colon-notation': 'single',
    'color-hex-length': 'long',
    'no-descending-specificity': null,
    'at-rule-no-unknown': null,
    'declaration-empty-line-before': 'never'
  }
};
