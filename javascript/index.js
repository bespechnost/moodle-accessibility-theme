!function($) {



    var Panel = function(element, options) {
        this.$element = $(element);
        this.list_style = ['color0','color1','color2','color3'];
        this.open = false;
        this.init();
    };

    Panel.prototype = {

        constructor: Panel

        , init: function () {
            var panel_div = document.createElement("div");
            panel_div.className = 'accessibility_panel';
            panel_div.innerHTML = '' +
                '<div class="menu">' +
                '<a href="#" class="expand">Настройки</a>' +
                '</div>' +
                '<div class="settings min">' +
                '<p>Цвет: ' +
                '' +
                '<a href="#" class="color0">цвет0</a>' +
                '<a href="#" class="color1">цвет1</a>' +
                '<a href="#" class="color2">цвет2</a>' +
                '<a href="#" class="color3">цвет3</a>' +
                '' +
                '</p>' +
                '' +
                '</div>';
            document.body.appendChild(panel_div);
            this.$element = $(panel_div);
            this.$element.find('.expand').on('click', $.proxy(this.expand,this));


            this.$element.find('.color0').on('click', $.proxy( this.set_color, this, '' ));
            this.$element.find('.color1').on('click', $.proxy( this.set_color, this, 'color1' ));
            this.$element.find('.color2').on('click', $.proxy( this.set_color, this, 'color2' ));
            this.$element.find('.color3').on('click', $.proxy( this.set_color, this, 'color3' ));

            //$('body').addClass(this.list_style[1]);
        }

        , expand : function () {
            this.$element.find('.settings').toggleClass('min');
        }

        , set_color : function (color) {
            for (n in this.list_style) {
                $('body').removeClass( this.list_style[n] );
            }
            if (color !== '') {
                $('body').addClass(color);
            }
        }

    };




    $.fn.panel = function (option) {
        return this.each(function () {
            var $this = $(this)
                , data = $this.data('panel')
                , options = typeof option == 'object' && option;
            if (!data) {
                $this.data('panel', (data = new Panel(this, options)));
            }
            if (typeof option == 'string') {
                data[option]();
            }
        })
    }

    $.fn.panel.Constructor = Panel
}(window.jQuery);



$(document).ready(function() { $(document).panel(); });























/*
(function( $ ){

    var methods = {
        init : function( options ) {
            var panel = document.createElement("div");
            panel.className = 'accessibility_panel min';
            panel.innerHTML = '' +
                '<div class="options">' +
                '<a href="#" class="expand">Настройки</a>' +
                '</div>' +
                '<p>Шрифт: <a href="#">10</a><a href="#">12</a><a href="#">16</a></p>' +
                '';
            document.body.appendChild(panel);
            $(this).on( "click", function() {alert(1)} )
            $(".accessibility_panel .expand").on( "click", $.proxy( this.expand, this ) )

        },

        expand : function () {
            alert(1111)
        }
    };

    $.fn.panel = function( method ) {

        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.panel' );
        }

    };

})( jQuery );

// calls the init method
$(document).ready(
    function() {
        $(document).panel();
    }
);



    */