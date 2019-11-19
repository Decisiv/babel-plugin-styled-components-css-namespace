import postcss from 'postcss';

export default postcss.plugin('add-parent-selector', (opts = {}) =>
  // Work with options here
  root => {
    root.walkRules(rule => {
      if (rule.parent && rule.parent.type === 'root') {
        rule.selectors = rule.selectors.map(selectors =>
          selectors.split(/,[\s]* /g).map(selector => {
            // don't add the parent class to a rule that is
            // exactly equal to the one defined by the user
            if (selector === opts.selector) {
              return selector;
            }
            var newSelector = `${opts.selector} ${selector}`;
            return newSelector;
          })
        );
      }
    });
  }
);
