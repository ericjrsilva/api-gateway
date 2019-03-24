const request = require('request-promise-native');

const MAX_RETRIES = 2;

exports.request_with_retry = async(options) => {
  console.log(options)
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {

      return await request(options)
  
    } catch (err) {
      if (err.statusCode && err.statusCode >= 500) { //Server Errors
        const timeout = Math.pow(2, i);
        console.log('Waiting for', timeout, 'ms');
        setTimeout(() => {}, timeout);
        console.log('Retrying because of', err.message, i);
      }

      if(i+1 == MAX_RETRIES)
        throw Error(err);
      
    }
  }
}

exports.request_only = async(options) => {
  try {

    return await request(options)

  } catch (err) {
    throw Error(err.message);
  }
}