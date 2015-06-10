mapService = (function(){
  var self = {};

  var map;
  var infowindow;
  var infoContent;

  function callback(results, status) {
    console.log(status);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        self.createMarker(results[i]);
      }
    }
  }

  self.findMyCurrentLocation = function(callback,errorHandler){
    var geoService = navigator.geolocation;
    if (geoService) {
    navigator.geolocation.getCurrentPosition(callback,errorHandler,{enableHighAccuracy:true});

    } else {
      alert("Your Browser does not support GeoLocation.");
    } 
  }
  

  self.initializePlaces = function(request, mapParam, contentString) {
    infowindow = new google.maps.InfoWindow();
    map = mapParam;
    infoContent  = contentString;
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }
  
  self.setCurrentLocMarker = function(map,latlng){
     new google.maps.Marker ({ map : map, 
                            animation : google.maps.Animation.DROP,
                            position : latlng  
                          });  
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

    google.maps.event.addListener(marker, 'click', function() {
      var content = infoService.createContent(place);
      infowindow.setContent($(content).html());
      infowindow.open(map, this);
    });
  }
  return self;
})();





// }

// google.maps.event.addDomListener(window, 'load', initialize);