!function($) {
    var Panel = function(element, options) {
        this.$element = $(element);

        // массивы всех возможных классов, подключаемых в body
        this.list_color = ['color1','color2','color3'];
        this.list_font_size = ['size1','size2'];
        this.list_font_spacing = ['spacing1','spacing2'];
        this.list_font_family = ['family1'];

        this.open = false; // true - панель настроек открыта. false - панель настроек закрыта

        //настройки панели
        this.options = {
               prefix: 'moodle_accessibility_theme_'
               ,selected:{
                    color: ''
                    , size: ''
                    , spacing: ''
                    , font_family: ''
               }
        }

        this.init();
    };

    Panel.prototype = {

        constructor: Panel

        , init: function () {

            // добавление в DOM панели
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

            // навешивание события на кнопки настройки цвета
            this.$element.find('.set_color_0').on('click', $.proxy( this.set_param, this, 'color', '' ));
            this.$element.find('.set_color_1').on('click', $.proxy( this.set_param, this, 'color', 'color1' ));
            this.$element.find('.set_color_2').on('click', $.proxy( this.set_param, this, 'color', 'color2' ));
            this.$element.find('.set_color_3').on('click', $.proxy( this.set_param, this, 'color', 'color3' ));

            // навешивание события на кнопки настройки размера шрифта
            this.$element.find('.set_size_0').on('click', $.proxy( this.set_param, this, 'size', '' ));
            this.$element.find('.set_size_1').on('click', $.proxy( this.set_param, this, 'size', 'size1' ));
            this.$element.find('.set_size_2').on('click', $.proxy( this.set_param, this, 'size', 'size2' ));

            // навешивание события на кнопки настройки межбуквенного интервала
            this.$element.find('.set_spacing_0').on('click', $.proxy( this.set_param, this, 'spacing', '' ));
            this.$element.find('.set_spacing_1').on('click', $.proxy( this.set_param, this, 'spacing', 'spacing1' ));
            this.$element.find('.set_spacing_2').on('click', $.proxy( this.set_param, this, 'spacing', 'spacing2' ));

            // навешивание события на кнопки настройки типа шрифта
            this.$element.find('.set_font_family_0').on('click', $.proxy( this.set_param, 'font_family', this, '' ));
            this.$element.find('.set_font_family_1').on('click', $.proxy( this.set_param, 'font_family', this, 'family1' ));

            // применяем настроек из cookie
            var params = ['color','size','spacing','font_family'];
            for (var n in params) {
                var value = this.cookie.get(this.options.prefix + params[n]);
                this.set_param(params[n], value ? value : '');
            }
        }

        /**
         * работа с cookie
         *
         */
        , cookie:{
            /**
             * запись параметра в cookie
             *
             * @param {String} name название параметра
             * @param {String} value значение параметра
             */
            set: function (name, value) {
                document.cookie = name + "=" + escape(value) + '; path=/';
            }

            /**
             * получение параметра из cookie
             *
             * @param {String} name название параметра
             */
            , get: function (name) {
                var regexp  = new RegExp("(?:; )?" + name + "=([^;]*);?");
                return regexp.test(document.cookie) ? decodeURIComponent(RegExp["$1"]) : false
            }
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
        , set_param : function (name,value) {
            var list = [];

            switch (name) {
                case 'color':
                    list = this.list_color;
                    break;
                case 'size':
                    list = this.list_font_size;
                    break;
                case 'spacing':
                    list = this.list_font_spacing;
                    break;
                case 'font_family':
                    list = this.list_font_family;
                    break;
            }

            for (n in list) {
                $('body').removeClass( list[n] );
            }

            if (value !== '') {
                $('body').addClass(value);
            }

            // сохраняем значение в парметры
            this.options.selected[name] = value;

            // сохраняем значение в cookie
            this.cookie.set(this.options.prefix + name,value);
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