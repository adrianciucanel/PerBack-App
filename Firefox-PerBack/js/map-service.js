mapService = (function(){
  var self = {};

  //private members

  var currentMarkers = 0;
  var map;
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay;
  var infowindow;
  var infoContent;

  //private methods

   function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        self.createMarker(results[i]);
      }
    }
  }

   var showDirections = function(destination){
    //self.deleteAllMarkers();
    self.findMyCurrentLocation(function(position){
        var start = new google.maps.LatLng (position.coords.latitude, position.coords.longitude);
        var request = {
            origin:start,
            destination:destination,
            travelMode: google.maps.TravelMode.WALKING
        };
        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsResponse = response;
          }
        });
    },errorHandler);
  }

  //public methods

  self.findMyCurrentLocation = function(callback,errorHandler){
    var geoService = navigator.geolocation;
    if (geoService) {
      navigator.geolocation.getCurrentPosition(callback,errorHandler,{enableHighAccuracy:true});
    } else {
      alert("Your Browser does not support GeoLocation.");
    } 
  }

  

  self.initializePlaces = function(request, mapParam, contentString) {
    currentMarkers = [];
    infowindow = new google.maps.InfoWindow();
    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

    map = mapParam;
    infoContent  = contentString;
    directionsDisplay.setMap(map);
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }
  
  self.setCurrentLocMarker = function(map,latlng){
     var marker = new google.maps.Marker ({ map : map, 
                            animation : google.maps.Animation.DROP,
                            position : latlng  
                          });
    currentMarkers.push(marker);
  }

  self.createMarker = function(place) {
    var placeLoc = place.geometry.location;
    var image = {
      url: place.icon,
      scaledSize: new google.maps.Size(40, 40)
    };
    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      position: place.geometry.location
    });
    currentMarkers.push(marker);
    //add marker event listener
    google.maps.event.addListener(marker, 'click', function() {
       self.findMyCurrentLocation(function(position){
          var start = new google.maps.LatLng (position.coords.latitude, position.coords.longitude);
          //build the directions request
          var request = {
              origin:start,
              destination:place.geometry.location,
              travelMode: google.maps.TravelMode.WALKING
          };

          //get the directions
          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              //create the content for the info window
              var content = infoService.createContent(place,response,function(){
                  directionsDisplay.setDirections(response);
              });

              infowindow.setContent($(content).html());
              infowindow.open(map, marker);
            }
          });
        },errorHandler);
    });
  }

  self.deleteAllMarkers = function(){
    var size = currentMarkers.length;
    for(var i = 0;i < size;i++){
      currentMarkers[i].setMap(null);
    }
  }

//expose self
  return self;
  
})();






