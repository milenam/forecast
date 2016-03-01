var Weather = angular.module('Weather', ["ngRoute"]);


Weather.config(function($routeProvider){
    $routeProvider.when("/", {
        templateUrl: 'assets/templates/home.html'
        }
    ).when('/weather', {
        templateUrl: 'assets/templates/weather.html'
    }).otherwise({
        redirectTo: '/'
    });
})


Weather.controller('weatherController', function($scope, $window, $http) {
    $scope.hi = "Hi";
    $scope.init = function() {
        $scope.menu = [{menuItem: "Home", hash :"/#/", id: "home"}, {menuItem: "Weather", hash: "/#/weather", id: "weather"}];
        $scope.ifWeather();
        $scope.emptyField = true;
        $scope.notFound = true;
    }

    $scope.ifWeather = function() {
        if ($window.location.hash == "#/weather") {
          $scope.hideWeather = false;
        } else {
          $scope.hideWeather = true;
          $scope.curr = "Home";
        }
    }

    $scope.toggleNav = function() {
        if ($(".main").is(".full-width")) {
            $("nav").removeClass("hidden").animate({
                left: "0%"
            });
            $(".main").animate({
                left: "25%",
                width: "75%"
            }).removeClass("full-width");
        } else {
            $("nav").animate({
                left: "-25%"
            });

            $(".main").animate({
                left: "0%",
                width: "100%"
            }).addClass("full-width");
        }
        $scope.hideWeather = true;
    }

    $scope.activeMenu = function(index) {
        $scope.hideWeather = true;
        var array = $(".menu li");
        $(array).removeClass("active");
        $(array[index]).toggleClass('active');
        if ($("#weather").parent().hasClass('active')) {
            $scope.hideWeather = false;
        }
        $scope.curr = $('li.active a').text();
    }

    $scope.timeConverter = function(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = month + '/' + date + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }



    $scope.submitForm = function(params) {
        if (params == undefined) {
            $scope.displayError(".error");
            $scope.loading = false;
        } else {
            $scope.loading = true;
            $scope.notFound = true;
            $scope.key = "2f7247a2f24f45b5a0b343363743e52e";
            $http.get("http://api.openweathermap.org/data/2.5/weather?q=" + params.city + "," + params.state + "&appid=" + $scope.key + "").then(function(response) {
                if (response.data.cod != 200) {
                    console.log(response);
                    $scope.loading = false;
                    $scope.displayError(".error");
                } else {  
                    // console.log(response);
                    $scope.hideError(".error");       
                    $scope.currentWeather = response.data.weather[0].description;
                    $scope.lastReading = new Date();
                    $scope.temp = Math.round((response.data.main.temp - 273.15)* 9/5 + 32);
                    $scope.humidity = response.data.main.humidity;
                    $scope.sunrise = $scope.timeConverter(response.data.sys.sunrise);
                    $scope.sunset = $scope.timeConverter(response.data.sys.sunset);
                    $scope.displayResults();
                    $scope.loading = false;
                }
            }, function(error) {
                $scope.loading = false;
                $scope.displayError(".error");
            });
        }
    }

    $scope.displayResults = function() {
        $(".results").removeClass("hidden");
    }

    $scope.displayError = function(el){
       $(el).removeClass('hidden').addClass('display');
    }

    $scope.hideError = function(el){
       $(el).removeClass('display').addClass('hidden');
    }

    $scope.hideWeatherNav = function(event){
       $scope.hideWeather = true;
       $scope.curr = $(event.target).text();
    }

    $scope.init();

});

Weather.directive('breadcrumbs', function() {
    return {
        restrict: 'E',
        controller: 'weatherController',
        templateUrl: function() {
            return 'assets/templates/breadcrumbs.html'
        }
    }
});
