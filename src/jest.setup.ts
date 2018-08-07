import 'jest-preset-angular';
global['CSS'] = null;

// missing property that is not a part of the DOM by default
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});
