getRandomNumber = (length) => {
  let num = 0;
  for (let i = 0; i < length; i += 1) {
    num *= 10;
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

getRandomString = (length, charRangeMin = 65, charRangeMax = 90) => {
  const range = charRangeMax - charRangeMin;
  let rstr = '';
  for (let i = 0; i < length; i += 1) {
    rstr += String.fromCharCode(charRangeMin + Math.floor(Math.random() * (range + 1)));
  }
  return rstr;
}

module.exports.getRandomInstance = () => {
  return {
    dial: `${getRandomNumber(3)}-${getRandomNumber(8)}`,
    firstName: getRandomString(7),
    lastName: getRandomString(7),
  };
}

module.exports.getDialPath = (dial) => {
  const [natPart, numPart] = dial.split('-');
  const pathParts = numPart.toString().match(/.{1,3}/g);
  pathParts.unshift(natPart);
  return pathParts.join('/');
}

module.exports.stamp = () => `${new Date().toLocaleTimeString('it-IT')}.${Date.now().toString().substr(9,3)}`;
