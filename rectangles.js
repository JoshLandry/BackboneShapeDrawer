(function () {
  
    var Rectangle = Backbone.Model.extend({
        url: 'http://localhost:3000/rectangles',
        defaults: {
            'type': 'shape',
            'width': 50,
            'height': 50,
            'position': {
                x: 600,
                y: 100
            }
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

    var Rectangles = Backbone.Collection.extend({
        model: Rectangle,
        localStorage: new Backbone.LocalStorage("Rectangles"),
        url: 'http://localhost:3000/rectangles',
        comparator: function (rectangle) {
            return rectangle.get('width');
        }
    },
    {
        oneRectangle: function () {
            return new Rectangle({
                color: 'green'
            })
        }
    });

    var r = Rectangles.oneRectangle();
    console.log(JSON.stringify(r))

    var rectangles = new Rectangles([
            {
                width: 100,
                height: 60,
                position: {
                    x: 300,
                    y: 150
                },
                color: '#ff0000'
            },
            {
                width: 50,
                height: 20,
                position: {
                    x: 150,
                    y: 200
                },
                color: '#00ff00'
            },
            {
                width: 30,
                height: 160,
                position: {
                    x: 500,
                    y: 020
                },
                color: '#0000ff'
            }
        ]);


    var drawShapes = function () {
        rectangles.forEach(function (rectangle) {
        $('div#canvas').append(new RectangleView({model: rectangle}).render().el);
        console.log('drew a rectangle');
        });
    }

    var saveShapes = function () {

        rectangles.forEach(function (rectangle) {
            rectangle.save({}, {
                success: function () {alert('u got it buddy')},
                error: function () {alert('error motherfxcker')}
            });

            console.log('save 2 server');
        });
     
    }

    rectangles.on('add', function (model, col, options) {
        console.log('added '  + model.get('type') + ' at index ' + model.get('position').x + ", " + model.get('position').y);
        saveShapes();
    });

    rectangles.add(r);

    console.log(rectangles.length);

    drawShapes();

    // Validate is triggered automatically by Backbone w/ 'set' and 'save' operations.

    // You can pass html directly into 'this.$el.html(<p></p>)'

    // Don't attach views to existing elements

    // Don't access DOM elements that aren't part of the view

})();