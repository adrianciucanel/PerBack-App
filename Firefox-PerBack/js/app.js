$(document).ready(function(){
	var content = $('#content');
    var start = $('#start');

    //handle the nav bar buttons click events
    start.bind('click', function(event) {
        routesService.startPage().success(function(html) {
            content.html(html);
        });
    });

    $('#navigation').bind('click', function(event) {
         routesService.navigationPage().success(function(html) {
            content.html(html);
        });

    });
    $('#help').bind('click', function(event) {
        routesService.helpPage().success(function(html) {
            content.html(html);
        });

    });
    $('#hotel').bind('click', function(event) {
        routesService.hotelPage().success(function(html) {
            content.html(html);
        });

    });

    $("#btnLocateMe").click(function(){
  		$.mobile.changePage ($("#map-page"));
		start.click();		   
	});
});