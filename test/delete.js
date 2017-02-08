var request    = require('../');
var should     = require('should');
var sinon      = require('sinon');
var oldRequest = require('request');

describe('Request DELETE', function() {
  var stub;

  beforeEach(function(done) {
    var stub = sinon.stub(oldRequest, 'Request', function(options) {
      options.method.should.eql('DELETE');

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

  it('should DELETE', function(done) {
    request
      .delete('http://test.com')
      .then(function(response) {
        response.should.instanceOf(Object).and.have.property('test', true);

        done();
      })
      .catch(done);
  });

  it('should throw error', function(done) {
    request
      .delete('http://bad.com')
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
