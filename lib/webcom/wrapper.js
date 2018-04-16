const myWebcom = require('webcom');

// delete global.Webcom;

module.exports = myWebcom;
function promisifyWebcomStyleCallback(tobePromisified) {
  return function tbPromisified(...args) {
    return new Promise((resolve, reject) => {
      tobePromisified.call(this, ...args, (error, other) => {
        if (error) { reject(error); } else { resolve(other); }
      });
    });
  };
}

const enhancedPrototype = Object.create(myWebcom.prototype);
enhancedPrototype.getPathFromRoot = function getPathFromRoot() {
  return this.toString().replace(this.root().toString(), '');
};
enhancedPrototype.navigateFromRoot = function navigateFromRoot(StringToNavigate = '') {
  return this.root().child(StringToNavigate);
};
enhancedPrototype.path = function navigateFromRoot() {
  return this.toString();
};
['logout', 'push', 'remove', 'resume', 'sendPasswordResetEmail', 'set', 'update'].forEach((element) => {
  const postfix = 'Async';
  // enhancedPrototype[element ] = enhancedPrototype[element];
  enhancedPrototype[element + postfix] = promisifyWebcomStyleCallback(enhancedPrototype[element]);
});
enhancedPrototype.valueAsync = function valueAsync() {
  return new Promise((resolve, reject) => {
    this.once('value', resolve, reject);
  });
};
myWebcom.prototype = enhancedPrototype;
// const newc = new s('www.webcom.com/base/colo');
// console.log(s.prototype);

// a.next;
