var rectApp = {};

(function (shapes) {
  
    shapes.Rectangle = Backbone.Model.extend({
        // url: 'http://localhost:3000/rectangles',
        area: function () {
            return this.get('height') * this.get('width')
        },
        perimeter: function () {
            return 2*this.get('height') + 2*this.get('width')
        },
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
            this.$el.css('left', this.$el.position().up + 10);
        }

    });

    var Rectangles = Backbone.Collection.extend({
        model: shapes.Rectangle,
        localStorage: new Backbone.LocalStorage("Rectangles"),
        // url: 'http://localhost:3000/rectangles',
        comparator: function (rectangle) {
            return rectangle.get('width');
        }
    },
    {
        oneRectangle: function () {
            return new shapes.Rectangle({
                color: 'green'
            })
        }
    });

    var r = Rectangles.oneRectangle();
    console.log(JSON.stringify(r))

    shapes.rectangles = new Rectangles([
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


    shapes.drawShapes = function () {
        shapes.rectangles.forEach(function (rectangle) {
        $('div#canvas').append(new RectangleView({model: rectangle}).render().el);
        console.log('drew a rectangle');
        });
    }

    var saveShapes = function () {

        shapes.rectangles.forEach(function (rectangle) {
            rectangle.save({}, {
                success: function () {console.log('save 2 server')},
                error: function () {alert('error motherfxcker')}
            });

        });
     
    }

    shapes.rectangles.on('add', function (model, col, options) {
        console.log('added '  + model.get('type') + ' at index ' + model.get('position').x + ", " + model.get('position').y);
        saveShapes();
        shapes.drawShapes();
    });

    shapes.rectangles.add(r);

    shapes.drawShapes();

    shapes.defaultRect = r;

    // Validate is triggered automatically by Backbone w/ 'set' and 'save' operations.

    // You can pass html directly into 'this.$el.html(<p></p>)'

    // Don't attach views to existing elements

    // Don't access DOM elements that aren't part of the view

})(rectApp);