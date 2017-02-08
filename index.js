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

exports.get = promisifiedVerbFunc('get');
exports.head = promisifiedVerbFunc('head');
exports.post = promisifiedVerbFuncWithData('post');
exports.put = promisifiedVerbFuncWithData('put');
exports.patch = promisifiedVerbFuncWithData('patch');
exports.del = promisifiedVerbFunc('delete');
exports['delete'] = promisifiedVerbFunc('delete');
