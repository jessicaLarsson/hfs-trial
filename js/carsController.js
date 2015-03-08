function loadXMLDoc() {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  if (window.XMLHttpRequest) {
    xmlhttp=new XMLHttpRequest();
  } else {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200){
      document.getElementById("cardata").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","http://api.scb.se/OV0104/v1/doris/sv/ssd/START/TK/TK1001/TK1001A/PersBilarDrivMedel",true);
  xmlhttp.send();
  xmlDoc = xmlhttp.responseXML;

  var ttitems=xmlDoc.getElementsByTagName("code");
  document.getElementById("cardata").innerHTML=ttitems;

}

function carsController($scope){
  $scope.greeting = { text: 'Hello' };

  
}

function customerController($scope,$http) {
  $http.get("http://api.scb.se/OV0104/v1/doris/sv/ssd/START/TK/TK1001/TK1001A/PersBilarDrivMedel")
  .success(function(response) { 
    console.log("title: " + response.variables); 
    $scope.cars = response.variables;

  });
}

