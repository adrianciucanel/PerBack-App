$(document).ready(function(){

  mapService.findMyCurrentLocation(showTouristAttracions,errorHandler);

});


function showTouristAttracions(position){
  
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
    radius: 5000,
    types: ['amusement_park','art_gallery','campground','museum','zoo']
  };
  mapService.initializePlaces(request,map);
  mapService.setCurrentLocMarker(map,latlng);
}
function errorHandler(error){
    alert("Error while retrieving current position. Error code: " + error.code + ",Message: " + error.message);
}
