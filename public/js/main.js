$(document).ready(function() {

  // Place JavaScript code here...
  // $(".accordion-toggle").on('click', function() {
  // 	$(".accordion-toggle").addClass('collapsed');
  // 	$(".accordion-body").style("height", "0px");
  // });
	var header_bgs = ['/img/header_bg.jpg', '/img/header_bg_2.jpg'];
	setInterval(function() {
			
	}, 1000);

	$('body').scrollspy({
      target: '.navbar-example'
    });

    $(window).on('load', function () {
      $('body').scrollspy('refresh');
    });

    $('#navbar-main [href=#]').click(function (e) {
      e.preventDefault();
    });

});
