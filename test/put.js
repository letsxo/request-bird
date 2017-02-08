var request    = require('../');
var should     = require('should');
var sinon      = require('sinon');
var oldRequest = require('request');

describe('Request PUT', function() {
  var stub;

  beforeEach(function(done) {
    var stub = sinon.stub(oldRequest, 'Request', function(options) {
      options.method.should.eql('PUT');
      options.json.should.eql(true);
      options.body.should.eql({test: 5});

      if (options.uri === 'http://test.com') {
        options.callback(null, {
          test: true
        });
      } else {
        options.callback(new Error('Test error'));
      }
    });

    done();
  });

  afterEach(function(done) {
    oldRequest.Request.restore();
    done();
  });

  it('should PUT', function(done) {
    request
      .put('http://test.com', {
        test: 5
      })
      .then(function(response) {
        response.should.instanceOf(Object).and.have.property('test', true);

        done();
      })
      .catch(done);
  });

  it('should throw error', function(done) {
    request
      .put('http://bad.com', {
        test: 5
      })
      .then(function(response) {
        done(new Error('Not failed'));
      })
      .catch(function(err) {
        err.should.instanceOf(Error);
        err.message.should.eql('Test error');
        done();
      });
  });
});
