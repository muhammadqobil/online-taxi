const Base64 = {

  decode(param) {
    return new Buffer(param, 'base64').toString();
  },
  encode(param) {
    return new Buffer(param).toString('base64');
  },

};


export default Base64;
