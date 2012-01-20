(function( $ ){

  var methods = {

    init : function( options ) {
        // initialize some vars
        var defaults = {
                "factor" : 0.05,
                "update" : function() {}
            }
          , settings = $.extend({}, defaults, options)

          , container = this
          , content = this.children(".mz-content")
          , initial_content_width = content.width();

        // no binded elements at first
        container.data("binded", [])

        container.bind('mousewheel.makeZoomable', function (event, delta) {
            // some math
            var left_offset = event.clientX - content.offset().left + $(window).scrollLeft()
              , new_left_offset = (1 + delta * settings.factor) * left_offset
              , content_new_width = (1 + delta * settings.factor) * content.width();

            // we cannot go under the initial zoom
            if (content_new_width < initial_content_width) {
                content_new_width = initial_content_width;
            }
            // update content's width
            content.width(content_new_width);

            var scrollLeft = new_left_offset - container.width() / 2
              , scrollLeft_ratio =  scrollLeft/container.width()
              , content_width_percentage = content_new_width/container.width()*100;

            container.scrollLeft(scrollLeft);
            binded_elements = container.data("binded");

            // update width and scrollLeft for binded elements
            $.each(binded_elements, function(_, binded_element) {
                var binded_content = binded_element.children(".mz-content");
                binded_content.width(content_width_percentage + "%");
                binded_element.scrollLeft(scrollLeft_ratio*binded_content.width());

                binded_element.data("update")(binded_element);
            });

            event.preventDefault();
        });
        return this;
    },

    bind : function(master, update_function) {
        $.each(this, function(_, item) {
            $(item).data("update", update_function);
        });
        master.data("binded").push(this);
        return this;
    }

  };

  $.fn.makeZoomable = function( method ) {

    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.makeZoomable' );
    }

  };

})( jQuery );
