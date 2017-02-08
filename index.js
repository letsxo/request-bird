var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var promisifiedVerbFunc = function(verb) {
  var method = verb.toUpperCase();

  return function(uri, options) {
    var params = request.initParams(uri, options);
    params.method = method;

    return request(params);
  };
};

var promisifiedVerbFuncWithData = function(verb) {
  var method = verb.toUpperCase();

  return function(uri, data, options) {
    var params = request.initParams(uri, options);
    params.method = method;

    if (typeof data !== 'undefined') {
      params.body = data;
      params.json = true;
    }

    return request(params);
  };
};

var requestBird = function(uri, options) {
  return request(uri, options);
};

requestBird.get = promisifiedVerbFunc('get');
requestBird.head = promisifiedVerbFunc('head');
requestBird.post = promisifiedVerbFuncWithData('post');
requestBird.put = promisifiedVerbFuncWithData('put');
requestBird.patch = promisifiedVerbFuncWithData('patch');
requestBird.del = promisifiedVerbFunc('delete');
requestBird['delete'] = promisifiedVerbFunc('delete');

module.exports = requestBird;
