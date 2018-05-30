console.log('\'Allo \'Allo!'); // eslint-disable-line no-console
jQuery.easing.def = "easeOutElastic";

$(document).ready(function() {

// live markdownizing demo
  // set filtering opts
  var mdOpts = {
    // filter out stuff
    converters: [{
      // grab the settings
      filter: ['div', 'span', 'small', 'aside', 'section', 'article', 'header', 'time', 'address'],
      replacement: function (innerHTML) { return innerHTML }
    }, {
      // don't include these in the final markdown
      filter: ['script', 'noscript', 'canvas', 'embed', 'object', 'param', 'svg', 'source', 'form', 'nav', 'iframe', 'footer', 'hgroup'],
      replacement: function () { return '' }
    }]
  };

  // start with default html converted to md
  var mdOut = toMarkdown($('#toMarkdown_input').val(), mdOpts);
  $('#toMarkdown_output').val(mdOut);
  // watch the user. if they make a move, update the MD damnit!
  $('#toMarkdown_input').bind('change paste keyup', function() {
    $('#toMarkdown_output').val(toMarkdown($(this).val()));
  });

// surpise demo unicorn
  // set a unicorn counter
  var unicount = 0;
  // create a function for the animation
  function animateSecret() {
    $('#secret')
      .animate({
          top: "30%",
          right: "40%"
      }, 3000, 'swing' ).animate({
          top: "-100%",
          right: "-100%"
      }, 5000, 'swing' )
  }

// nice nav scrolling
  $('.navbar.navbar-default a').on('click', function(e) {
    var link = $(this).attr('href');
    // check if it's a local anchor
    if ( link.length > 1 && link.indexOf('#') === 0 ) {
      e.preventDefault();
      var target = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(target).offset().top - 70
      }, 400, 'linear');
    } else if ( link.length === 1 && link.indexOf('#') === 0 ) {
      $('html, body').animate({
        scrollTop: 0
      }, 400, 'linear');
    }
  });


// watch the user as they scroll... O.o
  $(window).scroll(function() {

    // make sure unicorn hasn't been spotted yet
    if ($('#demo').visible(true)) {
      // check if demo section is visible
      if (unicount === 0) {
        // hold a sec and start the show
        setTimeout(animateSecret, 4000);
        // bump the counter
        unicount += 1;
      }
    }

    // only show the navbar brand when intro logo is out of sight
    if (!$('#logo').visible(true)) {
      $('#brand').addClass('needed');
    } else {
      $('#brand').removeClass('needed');
    }

  });

});
