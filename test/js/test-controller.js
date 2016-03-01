describe('weatherController', function() {
    var $httpBackend;

    // Set up the module
    beforeEach(module('Weather'));

    beforeEach(inject(function($injector) {
     	$httpBackend = $injector.get('$httpBackend');
     
   	}));

    it('should demonstrate using when (200 status)', inject(function($http) {
      	var city = "New York";
      	var cityEncoded = city.replace(" ","%20");
      	var state = "NY";
	  	var $scope = {};
	  	$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityEncoded + ',' + state + '&appid=2f7247a2f24f45b5a0b343363743e52e')
	    	.success(function(response, status, headers, config) {
	      		$scope.response = response.current_weather;
	    	})
	    	.error(function(data, status, headers, config) {
	      		console.log(data, status, headers, config);
	  	    });

	  	$httpBackend
	    	.when('GET', 'http://api.openweathermap.org/data/2.5/weather?q=New%20York,NY&appid=2f7247a2f24f45b5a0b343363743e52e')
	    	.respond(200, {current_weather: "light rain"});

	  	$httpBackend.flush();
	  	expect($scope.response).toEqual("light rain");

	}));

	it('should demonstrate using when (404 status)', inject(function($http) {
      	var city = "koajfwe";
      	var cityEncoded = city.replace(" ","%20");
      	var state = "JJK";
	  	var $scope = {};
	  	$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityEncoded + ',' + state + '&appid=2f7247a2f24f45b5a0b343363743e52e')
	    	.success(function(data, status, headers, config) {
                if (data.cod != "200") {
	      		    $scope.response = data.message;
	      		}
	    	})
	    	.error(function(data, status, headers, config) {
	      		console.log(data, status, headers, config);
	  	    });
    
	  	$httpBackend
	    	.when('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + cityEncoded + ',' + state + '&appid=2f7247a2f24f45b5a0b343363743e52e')
	    	.respond(200, {message: "Error: Not found city", cod: "404"});

	  	$httpBackend.flush();
	  	expect($scope.response).toEqual("Error: Not found city");

	}));

	it('should demonstrate using when (500 status)', inject(function($http) {
      	var city = "New York";
      	var cityEncoded = city.replace(" ","%20");
      	var state = "NY";
	  	var $scope = {};
	  	$http.get('http://api.openweathermap.org/data/2.5/weater?q=' + cityEncoded + ',' + state + '&appid=2f7247a2f24f45b5a0b343363743e52e')
	    	.success(function(data, status, headers, config) {
	      		$scope.response = data;
	    	})
	    	.error(function(data, status, headers, config) {
	    		$scope.error = data.message;
	  	    });
       
	  	$httpBackend
	    	.when('GET', 'http://api.openweathermap.org/data/2.5/weater?q=' + cityEncoded + ',' + state + '&appid=2f7247a2f24f45b5a0b343363743e52e')
	    	.respond(500, {message: "Oops, something went wrong."});

	  	$httpBackend.flush();
	  	expect($scope.error).toBe("Oops, something went wrong.");

	}));

});

