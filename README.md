# Promisified request

This packages is a wrapper around the [request](https://github.com/request/request) library.
We are using [bluebird](http://bluebirdjs.com/docs/getting-started.html) for promisification.

## Installation

```
npm install request bluebird request-bird
```

## Usage

### GET

If you just want a GET request you can do that in the following way:

```
var request = require('request-bird');

request('http://test.com')
  .then(function(response) {
    
  })
  .catch(function(err) {

  });

```

Or you can use the get function:

```
var request = require('request-bird');

request
  .get('http://test.com')
  .then(function(response) {
    
  })
  .catch(function(err) {

  });

```

### POST

You can send data easier with this package because we added a parameter for that to the post, put, patch functions.

```
var request = require('request-bird');

request
  .post('http://test.com', {
    foo: 'bar'
  })
  .then(function(response) {
    
  })
  .catch(function(err) {

  });

```
