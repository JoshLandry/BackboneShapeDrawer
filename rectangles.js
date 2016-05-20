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
            this.setImage();
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

        setImage: function () {
            // this.$el.css({'background-image': url("./img/smearmaze.jpg")});
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
            var randomColor;

            if (Math.random() < .3) {
                randomColor = "blue";
            } else if (Math.random() < .7) {
                randomColor = "yellow";
            } else if (Math.random() < .4) {
                randomColor = "green";
            } else if (Math.random() < .5) {
                randomColor = "red";
            } else {
                randomColor = "orange";
            }

            var randomX = Math.random() * 600;
            var randomY = Math.random() * 600;
            var randomHeight = Math.random() * 200;
            var randomWidth = Math.random() * 200;

            return new shapes.Rectangle({
                width: randomWidth,
                height: randomHeight,
                color: randomColor,
                position: {
                    x: randomX,
                    y: randomY
                }
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

    shapes.add = function() {
        var shape = Rectangles.oneRectangle();
        shapes.rectangles.add(shape);
        console.log('added');
        console.log(shapes.rectangles.length);
    }

    shapes.populate = function() {
        shapes.generateShapes = window.setInterval('rectApp.add()', 200);
        shapes.drawShapesInterval = window.setInterval('rectApp.drawShapes()', 500);
        setTimeout('rectApp.stop()', 2000);
    }

    shapes.flow = function() {
    
        shapes.rectangles.forEach(function (rectangle) {

            if(rectangle.get('position').x < (500 * Math.random()) ) {
                var randPosX = shapes.posX += (Math.random() * 20);
                var randPosY = shapes.posY -= (Math.random() * 20);
            } else {
                var randPosX = shapes.posX -= (Math.random() * 20);
                var randPosY = shapes.posY += (Math.random() * 20);
            }

            rectangle.set({position:{x: randPosX,y: randPosY}});

        });

        shapes.timer += 100;

        if(shapes.timer < 2000) {
            window.setTimeout('rectApp.flow()', 100);
            window.setTimeout('rectApp.drawShapes()', 200);
        } else if (shapes.timer >= 2000) {
            shapes.timer = 0;
        }

        console.log(shapes.timer);
    }

    shapes.drift = function() {
    
        shapes.rectangles.forEach(function (rectangle) {

            if(rectangle.get('position').x < (500 * Math.random()) ) {
                var randPosX = rectangle.get('position').x += (Math.random() * 30);
                var randPosY = rectangle.get('position').y -= (Math.random() * 30);
            } else {
                var randPosX = rectangle.get('position').x -= (Math.random() * 30);
                var randPosY = rectangle.get('position').y += (Math.random() * 30);
            }

            rectangle.set({position:{x: randPosX,y: randPosY}});

        });

        shapes.timer += 100;

        if(shapes.timer < 2000) {
            window.setTimeout('rectApp.drift()', 100);
            window.setTimeout('rectApp.drawShapes()', 200);
        } else if (shapes.timer >= 2000) {
            shapes.saveShapes();
            shapes.timer = 0;
        }

        console.log(shapes.timer);
    }

    shapes.timer = 0;

    shapes.posX = 114;

    shapes.posY = 543;

    shapes.mouse_position = function() {

        if(!window.event) {
            console.log("no mouse data");
        } else {
            shapes.posX = window.event.clientX;
            shapes.posY = window.event.clientY; 
        }

        console.log("(" + shapes.posX + ", " + shapes.posY + ")");

        // setTimeout('rectApp.mouse_position()', 100);
    }

    shapes.stop = function() {
        var stopGenerating = function() {
            window.clearInterval(shapes.generateShapes);
        } 
        var stopDrawing = function() {
            window.clearInterval(shapes.drawShapesInterval);
        }
        stopGenerating();
        stopDrawing();
    }

    shapes.initDraggable = function() {
        var gridContainer = $("#canvas");

            Draggable.create(".rectangle", {
                bounds: gridContainer,
                edgeResistance:1,
                cursor: "pointer",
                throwProps:true
            })
    }

    shapes.hardRedraw = true;

    shapes.drawShapes = function () {

        if(shapes.hardRedraw) {
            $('div#canvas').empty();
        }

        shapes.rectangles.forEach(function (rectangle) {
        $('div#canvas').append(new RectangleView({model: rectangle}).render().el);
        console.log('drew a rectangle');
        });
        shapes.initDraggable();
        shapes.mouse_position();
    }

    shapes.saveShapes = function () {

        shapes.rectangles.forEach(function (rectangle) {
            rectangle.save({}, {
                success: function () {console.log('save 2 server')},
                error: function () {alert('error motherfxcker')}
            });

        });
     
    }

    shapes.rectangles.on('add', function (model, col, options) {
        console.log('added '  + model.get('type') + ' at index ' + model.get('position').x + ", " + model.get('position').y);
        shapes.saveShapes();
    });

    shapes.rectangles.add(r);

    console.log(shapes.rectangles.length);

    shapes.drawShapes();

    shapes.defaultRect = r;

    // Validate is triggered automatically by Backbone w/ 'set' and 'save' operations.

    // You can pass html directly into 'this.$el.html(<p></p>)'

    // Don't attach views to existing elements

    // Don't access DOM elements that aren't part of the view

})(rectApp);