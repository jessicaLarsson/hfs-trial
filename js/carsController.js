function customerController($scope,$http) {
  var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // intercept OPTIONS method
        if ('OPTIONS' === req.method) {
            res.send(200);
        } else {
            next();
        }
    };
  $http.get("http://api.scb.se/OV0104/v1/doris/sv/ssd/START/TK/TK1001/TK1001A/PersBilarDrivMedel")
  .success(function(response) { 
    console.log("title: " + response.variables); 
    $scope.cars = response.variables;
  });
}

