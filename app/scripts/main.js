console.log('\'Allo \'Allo!'); // eslint-disable-line no-console
jQuery.easing.def = 'easeOutElastic';

// helper to check if elem is visible on screen
function isSeen(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}


$(document).ready(function() {

  // live markdownizing demo

  var mdOpts = {
    // filter out stuff
    converters: [{
      // grab the settings
      filter: ['div', 'span', 'small', 'aside', 'section', 'article', 'header', 'footer', 'hgroup', 'time', 'address', 'button'],
      replacement: function (innerHTML) { return innerHTML }
    }, {
      // don't include these in the final markdown
      filter: ['script', 'noscript', 'canvas', 'embed', 'object', 'param', 'svg', 'source', 'nav', 'iframe',],
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
          top: '30%',
          right: '40%'
      }, 3000, 'swing' ).animate({
          top: '-100%',
          right: '-100%'
      }, 5000, 'swing' )
  }

  // nice nav scrolling
  $('a[href^="#"]').on('click', function(e) {
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
    if (isSeen($('#demo h1'))) {
      // check if demo section is visible
      if (unicount === 0) {
        // hold a sec and start the show
        setTimeout(animateSecret, 4000);
        // bump the counter
        unicount += 1;
      }
    }

    // only show the navbar brand when intro logo is out of sight
    if (!isSeen($('#logo'))) {
      $('#brand').fadeIn().css('display','inline-block');
    } else if (window.innerWidth > 767) {
      // fade logo out on large screens
      $('#brand').fadeOut();
    }

  });

  // auto icon for external links
  var icon = '<i class="fas fa-external-link-alt"></i>';
  $('a').not('nav a').filter(function() {
    return this.hostname && this.hostname !== location.hostname;
  }).append(' ' + icon);

});

