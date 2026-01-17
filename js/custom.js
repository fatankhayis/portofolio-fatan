
(function ($) {

  "use strict";

  // PRE LOADER
  $(window).on('load', function(){
    $('.preloader').fadeOut(1000);
  });

  // CUSTOM LINK (smooth scroll)
  $('.custom-link').click(function(){
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height() + 10;

    scrollToDiv(elWrapped,header_height);
    return false;

    function scrollToDiv(element,navheight){
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop-navheight;

      $('body,html').animate({ scrollTop: totalScroll }, 300);
    }
  });

})(window.jQuery);

// Sync skill percent labels to progress bars on load and watch for changes
(function(){
  function syncBars(){
    document.querySelectorAll('.skill-percent').forEach(function(label){
      var skill = label.dataset.skill;
      var text = label.textContent || '';
      var m = text.match(/(\d{1,3})/);
      if(m){
        var value = Math.max(0, Math.min(100, parseInt(m[1],10)));
        var bar = document.querySelector('.progress-bar[data-skill="'+skill+'"]');
        if(bar){
          bar.style.width = value + '%';
          bar.setAttribute('aria-valuenow', value);
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    syncBars();
    // observe in-page edits to percent labels (if any)
    var observer = new MutationObserver(function(){ syncBars(); });
    document.querySelectorAll('.skill-percent').forEach(function(el){
      observer.observe(el, { childList: true, characterData: true, subtree: true });
    });
  });

})();


