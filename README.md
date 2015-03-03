# Google App Engine Channel API Stub

A simple stub for unit testing with the [Google App Engine Channel API](https://cloud.google.com/appengine/docs/python/channel/javascript) javascript client.
Includes a convenient way to access `Socket` objects outside of their declared scope for triggering handlers.

## Installation

Directly from bower:  
`bower install --save-dev appengine-channel-api-stub`

Or manually download the [latest release](../../releases).

## Use

Include the `channel-api-stub.js` file with your testing framework files. Any references to the Channel API client classes and methods will now be valid.

## API

In addition to all of the implemented API classes and methods, a special method has been added which allows the fetching of any `Socket` object from anywhere, allowing a socket to be accessed and triggered from outside it's declared scope such as in unit test functions where it may not have been otherwise accessible.

#### goog.appengine.Socket._get(token)

Returns the socket object opened from anywhere using the specified token.

```javascript
// example usage

function openChannel() {
	// channel and socket are contained within the function scope and not accessible outside
	var channel = new goog.appengine.Channel('token');
	var socket = channel.open();
    socket.onmessage = function(message) {
		console.log(message);
	};  
}

// open the channel
openChannel();

// get the socket and trigger it's onmessage handler
var socket = goog.appengine.Socket._get('token');
socket.onmessage('test'); // console.log('test')
```

## Contribute

Pull requests more than welcome. Just remember to add tests for any new functionality and make sure all existing tests still pass!

Alternatively, report a bug or feature request using the [issue tracker](../../issues).

### Building Guide

Fork the project and then in your terminal run the following commands:

```bash
$ git clone https://github.com/[username]/appengine-channel-api-stub.git
$ cd appengine-channel-api-stub
$ npm install
```

This will download the project and all gulp dependencies. Whilst developing, run the `gulp` command from the project directory which will automatically run tests as you develop. Then once finished run `gulp build` to run tests once more and generate a build in the `./dist` directory. Commit and push your changes and then submit a pull request.


## Full Example

The general principal is to create/intercept the request for the Channel token, and then use the special `goog.appengine.Socket._get(token)` method to access the created socket and manually call the socket handler methods, passing in different messages for your test cases.

This simple example uses [Jasmine](http://jasmine.github.io/) testing framework and [Angular](https://angularjs.org/) but can be adapted for most other frameworks.

```javascript
// app.js

angular
	.module('test-example')
    .controller('TestCtrl', function($scope, $http) {
    	
        $scope.latestMessage = '';
        
        $scope.openChannel = function() {
        	
            $http.get('/openchannel').success(function(data) {
            	
                var token = data.token;
                
                var channel = new goog.appengine.Channel(token);
                var socket = channel.open();
                
                socket.onmessage = function(message) {
                	$scope.latestMessage = message;
                };
                
            });
            
        };
        
    });

```

```javascript
// test.spec.js

describe('TestCtrl', function() {

	var $scope, $httpBackend, $controller;
	
    beforeEach(module('test-example'));
    
    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$controller_) {
    	
        $scope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
        
        $controller = _$controller_('TestCtrl', {
        	'$scope': $scope
        });
        
    });
    
    describe('when opening a channel', function() {
    	
        var response;
        
        beforeEach(function() {
        	
            // set the channel token and mock the request for it
            // we can then use this token in our tests to gain access to the socket
            // created for the channel and trigger it's handlers
            response = {
            	token: 'test-token';
            };            
            $httpBackend.expectGET('/openchannel').respond(response);
            
        });
        
        afterEach(function() {
          $httpBackend.verifyNoOutstandingExpectation();
          $httpBackend.verifyNoOutstandingRequest();        
        });
        
        it ('should set the latest message correctly', function() {
        	
            $scope.openChannel();
            $httpBackend.flush();
            
            // use goog.appengine.Socket._get() to access the socket within the controller
            var socket = goog.appengine.Socket._get(response.token);
            
            // trigger an onmessage handler on the socket
            socket.onmessage('test message');
            
            // check that the onmessage handler inside the controller was called and worked as expected
            expect($scope.latestMessage).toBe('test message');
            
        });
        
    });
    
});
```
