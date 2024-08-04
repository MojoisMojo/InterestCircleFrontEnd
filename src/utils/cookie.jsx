import Cookie from 'js-cookie';
function encode(value) {
  if (!value) {
    return null;
  }
  return value.split('').map(char => {
    const binary = char.charCodeAt(0).toString(2).padStart(8, '0');
    const invertedBinary = [...binary].map(b => b === '0' ? '1' : '0').join('');
    return String.fromCharCode(parseInt(invertedBinary, 2));
  }).join('');
}

function decode(value) {
  if (!value) {
    return null;
  }
  return encode(value);
};

function getCookie() {
  const uid = Cookie.get('uid');
  return decode(uid);
}

export { encode, decode, getCookie };