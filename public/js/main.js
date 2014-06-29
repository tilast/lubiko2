$(document).ready(function() {

  // Place JavaScript code here...
  $(".accordion-toggle").on('click', function() {
    var self = this;
  	$(".accordion-toggle").each(function(it, obj) {
      if(self != obj) {
        $(obj).parents('.accordion-group').find('.accordion-body').removeClass('in');
        $(obj).addClass('collapsed');
      }
    });
  	// $(".accordion-body").style("height", "0px");
  });
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

  
  var VideoSlideShow = (function(object, videosList) {
    var videoObj,
        videos = [];
        currentVideo = 0,
        successInited = false;

    function forReturn(object, videosList) {
      _init(object, videosList);

      this.play = function() {
        videoObj.play();
      };

      this.pause = function() {
        videoObj.pause();
      };

      this.addVideo = function(name) {
        videos.push(name);
      };
    }

    var _init = function(object, videosList) {
      videoObj = object;
      videos = videosList ? videosList : [];

      if(videoObj) {
        successInited = true;
      } else {
        successInited = false;
      }

      if(videos.length > 0) {
        _loadAndPlay(videos[0]);
      }

      return successInited;
    };

    var _isSuccessInitedDecorator = function(f) {
      if(successInited) {
        return function() {
          return f.apply(this, arguments);
        }
      } else {
        return function() {};
      }
    };

    var _nextVideo = function() {
      _isSuccessInitedDecorator(function() {
        if(++currentVideo >= videos.length) {
          currentVideo = 0;
        }

        _loadAndPlay(videos[currentVideo]);
      })();
    };

    var _previousVideo = function() {
      _isSuccessInitedDecorator(function() {
        if(--currentVideo < 0) {
          currentVideo = videos.length - 1;
        }

        _loadAndPlay(videos[currentVideo]);
      });
    };

    var _loadAndPlay = function(src) {
      videoObj.setAttribute('src', src);
      videoObj.load();
      videoObj.play();
    };

    setInterval(function() {
      if(videoObj && videoObj.ended) {
        _nextVideo();
      }
    }, 500);

    return forReturn;
  })();

  var vss = new VideoSlideShow(document.querySelector('.videoshow'), ['videos/video1.mp4', 'videos/video2.mp4', 'videos/video3.mp4', 'videos/video4.mp4', 'videos/video5.mp4']);

  // console.log(document.querySelector('.videoshow'));

  $(".js-get-lubiko").on('click', function() {
    var data = {
      name: $("#inputName1").val(),
      phone: $("#inputPhone1").val(),
    };

    var err = false;
    var prevBorder = $("#inputName1").css('border');
    if(data.name == '' || !data.name) {
      $("#inputName1").css('border', '1px solid red');
      err = true;
    }

    if(!(/\+[\d]{11}/.test(data.phone))) {
      $("#inputPhone1").css('border', '1px solid red');
      err = true;
    }

    if(err) {
      return false;
    }

    $("#inputPhone1").css('border', prevBorder);
    $("#inputName1").css('border', prevBorder);

    $.post(
      '/get-lubiko', 
      {
        name: $("#inputName1").val(),
        phone: $("#inputPhone1").val(),
      },
      function(data) {
        $(".js-get-lubiko").text("Заявку принято! Мы скоро позвоним :)");
      }
    ).fail(function(err) {
      $(".js-get-lubiko").text("Странно, но с сайтом что-то не так. Приносим свои извинения, позвоните нам сами, пожалуйста ;(");
    });
  });
});