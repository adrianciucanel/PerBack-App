infoService = (function(){
	self = {};

	self.createContent = function(place){
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
		var heading = $('<h4></h4>');
		heading.text(place.name);
		div.append(heading);

		//directions button
		var button = $('<button></button>');
		button.addClass('directions-button');
		button.attr('title','Get directions');
		div.append(button);

		return div;
	} 

	return self;
})();