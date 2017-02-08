var request    = require('../');
var should     = require('should');
var sinon      = require('sinon');
var oldRequest = require('request');

describe('Request GET', function() {
  var stub;

  beforeEach(function(done) {
    var stub = sinon.stub(oldRequest, 'Request', function(options) {
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

  it('should do a get without function', function(done) {
    request('http://test.com')
      .then(function(response) {
        response.should.instanceOf(Object).and.have.property('test', true);

        done();
      })
      .catch(done);
  });

  it('should get an URL', function(done) {
    request
      .get('http://test.com')
      .then(function(response) {
        response.should.instanceOf(Object).and.have.property('test', true);

        done();
      })
      .catch(done);
  });

  it('should throw error', function(done) {
    request
      .get('http://bad.com')
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
