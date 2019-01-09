/**
 * @file
 * Defines initializing/attaching the Book Reader to the
 * defined element.
 *
 * This bookreader file is modified from its original form.
 * Purpose: redefines the BookReader proto to be aware
 * of Islandora Compound Objects.
 */
Drupal.settings.islandoraInternetArchiveBookReader_jQuery = jQuery.noConflict(true);

(function ($) {
  Drupal.behaviors.islandoraInternetArchiveBookReader = {
    attach: function (context, settings) {
      $('.islandora-internet-archive-bookreader', context).once('islandora-bookreader', function () {
        // Initialize and Render the BookReader.
        var bookReader = null;
        if (settings.islandoraInternetArchiveBookReader.pageSource === 'djatoka') {
          console.log('hi', this);
          bookReader = new IslandoraDjatokaBookReader(settings.islandoraInternetArchiveBookReader);
        }
        else if (settings.islandoraInternetArchiveBookReader.pageSource === 'iiif') {
          console.log('hi', this);
          bookReader = new IslandoraIiifBookReader(settings.islandoraInternetArchiveBookReader);
        }

        // Hide unused or unwanted toolbar buttons from view.
        $('#BRtoolbar').find('.read, .info, .share, .play, .pause').hide();

        if (!bookReader.searchEnabled()) {
          $('#textSrch').hide();
          $('#btnSrch').hide();
        }

        // Handle page resize, required for full screen.
        $(window).resize(function () {
          bookReader.windowResize();
          bookReader.updateCompoundBlockLocation();
        });

        // Add class 'aria-label' for accessibility support for screen readers.
        $('.ui-slider-handle').each(function(e){
          $(this).attr('aria-label', Drupal.t("Book Slider Handle"));
        });

        if ($.browser.mobile && settings.islandoraInternetArchiveBookReader.mobilize) {
          bookReader.goFullScreen();
        }
      });
    }
  };
})(jQuery);
