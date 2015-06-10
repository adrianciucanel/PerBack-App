infoService = (function(){
	self = {};

	self.createContent = function(place, directionResponse, directionsCallback){
		var div = $('<div></div>');
		div.addClass('info-container');

		//img
		if( place.photos instanceof Array && place.photos.length > 0){
			var img = $('<img></img>');
			var photo = place.photos[0].getUrl({ 'maxWidth': 100, 'maxHeight': 100 });
			img.attr('src',photo);
			div.append(img);
		}

	 	// name
		var heading = $('<p></p>');
		heading.text(place.name);
		heading.addClass('info-heading');
		div.append(heading);

		//route info 
		if(directionResponse != null){
			var list = $('<ul></ul>');
			list.addClass('info-list');
			//distance
			console.log(directionResponse);
			var distance = $('<li></li>');
			distance.text(directionResponse.routes[0].legs[0].distance.value + "m");

			//duration
			var duration =$('<li></li>');
			duration.text(directionResponse.routes[0].legs[0].duration.value + "s");

			list.append(distance);
			list.append(duration);
			div.append(list);
		}

		//directions button
		var button = $('<button></button>');
		button.addClass('directions-button');
		button.attr('title','Get directions');

		div.append(button);
		$(document).off( 'click', 'button.directions-button');
		$(document).on( 'click', 'button.directions-button', directionsCallback);

		return div;
	} 

	return self;
})();