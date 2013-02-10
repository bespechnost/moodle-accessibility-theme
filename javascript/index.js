!function($) {
    var Panel = function(element, options) {
        this.$element = $(element);
        this.list_style = ['color1','color2','color3'];
        this.list_font_size = ['size1','size2'];
        this.list_font_spacing = ['spacing1','spacing2'];
        this.list_font_family = ['family1'];
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
                '<a href="#" class="set_color_0">цвет0</a>' +
                '<a href="#" class="set_color_1">цвет1</a>' +
                '<a href="#" class="set_color_2">цвет2</a>' +
                '<a href="#" class="set_color_3">цвет3</a>' +
                '</p>' +

                '<p>Размер: ' +
                '<a href="#" class="set_size_0">13</a>' +
                '<a href="#" class="set_size_1">18</a>' +
                '<a href="#" class="set_size_2">24</a>' +
                '</p>' +

                '<p>Межбуквенный интервал: ' +
                '<a href="#" class="set_spacing_0">Стандартный</a>' +
                '<a href="#" class="set_spacing_1">Средний</a>' +
                '<a href="#" class="set_spacing_2">Большой</a>' +
                '</p>' +

                '<p>Имя шрифта: ' +
                '<a href="#" class="set_font_family_0">Arial</a>' +
                '<a href="#" class="set_font_family_1">Times New Roman</a>' +
                '</p>' +

                '</div>';
            document.body.appendChild(panel_div);
            this.$element = $(panel_div);
            this.$element.find('.menu').on('click', $.proxy(this.expand,this));


            this.$element.find('.set_color_0').on('click', $.proxy( this.set_param, this, '', this.list_style ));
            this.$element.find('.set_color_1').on('click', $.proxy( this.set_param, this, 'color1', this.list_style ));
            this.$element.find('.set_color_2').on('click', $.proxy( this.set_param, this, 'color2', this.list_style ));
            this.$element.find('.set_color_3').on('click', $.proxy( this.set_param, this, 'color3', this.list_style ));

            this.$element.find('.set_size_0').on('click', $.proxy( this.set_param, this, '', this.list_font_size ));
            this.$element.find('.set_size_1').on('click', $.proxy( this.set_param, this, 'size1', this.list_font_size ));
            this.$element.find('.set_size_2').on('click', $.proxy( this.set_param, this, 'size2', this.list_font_size ));

            this.$element.find('.set_spacing_0').on('click', $.proxy( this.set_param, this, '', this.list_font_spacing ));
            this.$element.find('.set_spacing_1').on('click', $.proxy( this.set_param, this, 'spacing1', this.list_font_spacing ));
            this.$element.find('.set_spacing_2').on('click', $.proxy( this.set_param, this, 'spacing2', this.list_font_spacing ));

            this.$element.find('.set_font_family_0').on('click', $.proxy( this.set_param, this, '', this.list_font_family ));
            this.$element.find('.set_font_family_1').on('click', $.proxy( this.set_param, this, 'family1', this.list_font_family ));

            //$('body').addClass(this.list_style[1]);
        }

        /**
         * показать/скрыть настройки
         *
         */
        , expand : function () {
            this.$element.find('.settings').toggleClass('min');
        }

        /**
         * переключение класса в body
         *
         * @param {String} color название подключаемого класс, добавляемого в body
         * @param {Array} list массив со всеми классами текущих настроек
         */
        , set_param : function (color,list) {
            for (n in list) {
                $('body').removeClass( list[n] );
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