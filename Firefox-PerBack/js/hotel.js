$(document).ready(function(){
     mapService.findMyCurrentLocation(showNearbyHotels,errorHandler);
});


function showNearbyHotels(position) {

  var latlng = new google.maps.LatLng (position.coords.latitude, position.coords.longitude);
  var $content = $("#map-page div:jqmData(role=content)");
  //Set the height of the div containing the Map to rest of the screen
  var options = {
    center: latlng,
    zoom: 15
  };

  $content.height(screen.height - 50);

  var map = new google.maps.Map($content[0], options);

  var request = {
    location: latlng,
    radius: 500,
    types: ['lodging','restaurant','food']
  };
  mapService.initializePlaces(request,map);
  mapService.setCurrentLocMarker(map,latlng);
}

function errorHandler(error){
    alert("Error while retrieving current position. Error code: " + error.code + ",Message: " + error.message);
}

// var directionsDisplay;
// var directionsService = new google.maps.DirectionsService();
// var map;

// function initialize() {
//   directionsDisplay = new google.maps.DirectionsRenderer();
//   var chicago = new google.maps.LatLng(41.850033, -87.6500523);
//   var mapOptions = {
//     zoom:7,
//     center: chicago
//   };
//   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//   directionsDisplay.setMap(map);
// }

// function calcRoute() {
//   var start = document.getElementById('start').value;
//   var end = document.getElementById('end').value;
//   var request = {
//       origin:start,
//       destination:end,
//       travelMode: google.maps.TravelMode.DRIVING
//   };
//   directionsService.route(request, function(response, status) {
//     if (status == google.maps.DirectionsStatus.OK) {
//       directionsDisplay.setDirections(response);
//     }
//   });
// }