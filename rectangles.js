(function () {
  
    var Rectangle = Backbone.Model.extend({
        defaults: {
            'type': 'shape'
        },
    });

    var RectangleView = Backbone.View.extend({

        tagName: 'div',

        className: 'rectangle',

        attributes: {
             'data-value': 12345
        },

        events: {
            'click': 'move'
        },

        render: function() {
            this.setDimensions();
            this.setPosition();
            this.setColor();
            return this;
        },

        setDimensions: function () {
            this.$el.css({
                width: this.model.get('width') + 'px',
                height: this.model.get('height') + 'px'
            });
        },

        setPosition: function () {
            var position = this.model.get('position');
            this.$el.css({
                left: position.x,
                top: position.y
            });
        },

        setColor: function () {
            this.$el.css('background-color', this.model.get('color'));
        },

        move: function () {
            this.$el.css('left', this.$el.position().left + 10);
        }

    });

    var models = [
        new Rectangle({
            width: 100,
            height: 60,
            position: {
                x: 300,
                y: 150
            },
            color: '#ff0000'
        }),
        new Rectangle({
            width: 50,
            height: 20,
            position: {
                x: 150,
                y: 200
            },
            color: '#00ff00'
        }),
        new Rectangle({
            width: 30,
            height: 160,
            position: {
                x: 500,
                y: 020
            },
            color: '#0000ff'
        })
    ];

    _(models).each(function (model) {
        $('div#canvas').append(new RectangleView({model: model}).render().el);
    });

    var rect1 = models[0];
    var rect2 = models[1];

    var rect4 = new Rectangle({});

    models[0].on('change:type', function () {
        console.log('your mom');
    });

    models[0].set('type', 'truck');

    console.log(rect1.get('type'));
    console.log(rect2.get('type'));
    console.log(rect4.get('type'));

    // Validate is triggered automatically by Backbone w/ 'set' and 'save' operations.

})();