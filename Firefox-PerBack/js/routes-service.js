routesService = (function(){
	self = {};

	self.startPage = function(){
		return ($.ajax({
        	url:'/view/start.html',
        	dataType:'html'
        }));
	}

	self.navigationPage = function(){
		return ($.ajax({
        	url:'/view/navigate.html',
        	dataType:'html'
        }));
	}

	self.helpPage = function(){
		return ($.ajax({
        	url:'/view/help.html',
        	dataType:'html'
        }));
	}

	self.hotelPage = function(){
		return ($.ajax({
        	url:'/view/hotel.html',
        	dataType:'html'
        }));
	}

	return self;
})();