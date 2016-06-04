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
            'image': "smearmaze",
            'position': {
                x: 600,
                y: 100
            },
            'selected': false
        },
    });

    var RectangleView = Backbone.View.extend({

        tagName: 'div',

        className: 'rectangle',

        attributes: {
             // 'data-value': 12345
        },

        events: {
            'click': 'select',
        },

        render: function() {
            this.setDimensions();
            this.setPosition();
            this.setColor();
            this.setImage();
            this.setSelected();
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
            this.$el.css({'background-image': 'url("./img/' + this.model.get('image') + '.jpg")' });
        },

        setSelected: function () {
            if(this.model.get('selected') === false) {
                this.$el.css('border-color', 'black');

            } else {
                this.$el.css('border-color', 'cyan');
            }
        },

        select: function () {
            if(this.model.get('selected') === false) {
                this.model.set({'selected': true});
                this.$el.css('border-color', 'cyan');
                console.log('selected');
            } else {
                this.model.set({'selected': false});
                this.$el.css('border-color', 'black');
                console.log('deselected');
            }

            // this.model.set({
            //                 position: {
            //                     x: shapes.posX,
            //                     y: shapes.posY
            //                 }
            //                 })
            this.setPosition();
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

    shapes.add = function(prefs) {
        var shape = Rectangles.oneRectangle();
        if(shapes.selectNew) {
            shape.set({selected: true});
        }
        shapes.rectangles.add(shape);
        // console.log(shapes.rectangles.length);
        shapes.drawShapes();
    }

    shapes.selectNew = true;

    shapes.residualMomentum = false;

    shapes.toggleMomentum = function() {
        if (shapes.residualMomentum) {
            shapes.residualMomentum = false;
        } else {
            shapes.residualMomentum = true;
        }
    }

    shapes.toggleSelectNew = function() {
        if (shapes.selectNew) {
            shapes.selectNew = false;
        } else {
            shapes.selectNew = true;
        }
    }

    shapes.moveRight = function () {

        shapes.rectangles.forEach(function (rectangle) {
            var newPosition = rectangle.get('position').x + 4;

            if(rectangle.get('selected')) {
                rectangle.set({position:{x: newPosition,y: rectangle.get('position').y}});
            }
        });

        shapes.drawShapes();
        
    }

    shapes.moveLeft = function() {

        shapes.rectangles.forEach(function (rectangle) {
            var newPosition = rectangle.get('position').x - 4;

            if(rectangle.get('selected')) {
                rectangle.set({position:{x: newPosition,y: rectangle.get('position').y}});
            }
        });

        shapes.drawShapes();
    }

    shapes.moveUp = function() {

        shapes.rectangles.forEach(function (rectangle) {
            var newPosition = rectangle.get('position').y - 4;

            if(rectangle.get('selected')) {
                rectangle.set({position:{x: rectangle.get('position').x,y: newPosition}});
            }
        });

        shapes.drawShapes();
    }

    shapes.moveDown = function() {

        shapes.rectangles.forEach(function (rectangle) {
            var newPosition = rectangle.get('position').y + 4;

            if(rectangle.get('selected')) {
                rectangle.set({position:{x: rectangle.get('position').x,y: newPosition}});
            }
        });

        shapes.drawShapes();
    }

    shapes.images = ['alinderblue', 'dreamcity', 'smearmaze', 'pruplecrazed', 'emissioncleanser', 'crazed', 'throughthetv', 'chapter3', 'alinderred', 'alindercyan'];

    shapes.gridImages = ['smearmaze', 'pruplecrazed', 'crazed', 'emissioncleanser', 'rainbowsmear'];

    shapes.shiftImage = function() {
        shapes.rectangles.forEach(function (rectangle) {

            if(rectangle.get('selected')) {

                console.log( shapes.gridImages.indexOf(rectangle.get('image')) );

                var newImageIndex = shapes.images.indexOf(rectangle.get('image')) + 1;
                var newImage = shapes.images[newImageIndex];

                if (Math.random() < .5 ) {
                    if(newImage) {
                        rectangle.set({image: newImage});
                    } else {
                        rectangle.set({image: "alinderblue"});
                    }
                }
            }
        })

        shapes.drawShapes();
    }

    shapes.animateGrid = function() {
        shapes.rectangles.forEach(function (rectangle) {

            if(rectangle.get('selected')) {

                console.log( shapes.gridImages.indexOf(rectangle.get('image')) );

                var newImageIndex = shapes.gridImages.indexOf(rectangle.get('image')) + 1;
                var newImage = shapes.gridImages[newImageIndex];

                if (Math.random() < .5 ) {
                    if(newImage) {
                        rectangle.set({image: newImage});
                    } else {
                        rectangle.set({image: "smearmaze"});
                    }
                }
            }
        })

        shapes.drawShapes();
    }

    shapes.randomImage = function() {
        shapes.rectangles.forEach(function (rectangle) {

            if(rectangle.get('selected')) {
                    if(Math.random() < .7) {
                    rectangle.set({image: 'alinderblue'});
                } else if (Math.random() < .7) {
                    rectangle.set({image: 'airport'});
                } else if (Math.random() < .7) {
                    rectangle.set({image: 'dreamcity'});
                } else if (Math.random() < .7) {
                    rectangle.set({image: 'colorgrid'})
                }
            }
        })

        shapes.drawShapes();
    }

    shapes.animationStyle = "grid";

    shapes.setAnimationStyle = function() {
        shapes.animationStyle = document.querySelectorAll('select')[0].value;
        console.log('set animation style to ' + shapes.animationStyle);
    }

    shapes.imageCycle = function() {

        if(shapes.animationStyle === "grid") {

            shapes.animateGrid();
            window.setTimeout('rectApp.imageCycle()', 100);

        } else if (shapes.animationStyle === "nextImage") {

            shapes.shiftImage();
            window.setTimeout('rectApp.imageCycle()', 100);

        } else if (shapes.animationStyle === "randomImage") {

            shapes.randomImage();
            window.setTimeout('rectApp.imageCycle()', 100);
        }

    }

    shapes.populate = function() {
        if(shapes.timer.populate < 800) {
            shapes.timer.populate += 100
            shapes.add();
            window.setTimeout('rectApp.populate()', 100);
        } else if (shapes.timer.populate >= 800) {
            shapes.timer.populate = 0;
        }
    }

    shapes.flow = function() {
    
        shapes.rectangles.forEach(function (rectangle) {

            if(rectangle.get('selected')) {

                if(rectangle.get('position').x < (500 * Math.random()) ) {
                    var randPosX = shapes.posX += (Math.random() * 10);
                    var randPosY = shapes.posY -= (Math.random() * 10);
                } else {
                    var randPosX = shapes.posX -= (Math.random() * 10);
                    var randPosY = shapes.posY += (Math.random() * 10);
                }

                rectangle.set({position:{x: randPosX,y: randPosY}});

            }  

        });

        shapes.timer.flow += 50;

        if(shapes.timer.flow < 3000) {
            window.setTimeout('rectApp.flow()', 50);
            window.setTimeout('rectApp.drawShapes()', 50);
        } else if (shapes.timer.flow >= 3000) {
            if(shapes.residualMomentum) {window.setTimeout('rectApp.slightDrift()', 1000)};
            shapes.timer.flow = 0;
        }

        console.log(shapes.timer.flow);
    }

    shapes.repulse = function() {
    
        shapes.rectangles.forEach(function (rectangle) {

            // head for corners

            if(rectangle.get('selected')) {

                if(rectangle.get('position').x < (500 * Math.random()) ) {
                    var randPosX = rectangle.get('position').x - (shapes.posX / 50);
                    var randPosY = rectangle.get('position').y - (shapes.posY / 50);
                } else {
                    var randPosX = rectangle.get('position').x + (shapes.posX / 50);
                    var randPosY = rectangle.get('position').y + (shapes.posX / 50);
                }

                rectangle.set({position:{x: randPosX,y: randPosY}});
            }

        });

        shapes.timer.repulse += 100;

        if(shapes.timer.repulse < 3000) {
            window.setTimeout('rectApp.repulse()', 100);
            window.setTimeout('rectApp.drawShapes()', 100);
        } else if (shapes.timer.repulse >= 3000) {
            if(shapes.residualMomentum) {window.setTimeout('rectApp.slightDrift()', 1000)};
            shapes.timer.repulse = 0;
        }

        // console.log(shapes.timer.repulse);
    }

    shapes.fourPoint = function() {
    
        shapes.rectangles.forEach(function (rectangle) {

            if(rectangle.get('selected')) {

                if( Math.random() < .5 ) {
                    var randPosX = shapes.posX * 2;
                    var randPosY = shapes.posY * 2;
                } else if ( Math.random() < .5) {
                    var randPosX = shapes.posX * 2
                    var randPosY = shapes.posY / 2
                } else if ( Math.random() < .5) {
                    var randPosX = shapes.posX / 2
                    var randPosY = shapes.posY * 2
                } else {
                    var randPosX = shapes.posX / 2
                    var randPosY = shapes.posY / 2
                }

                rectangle.set({position:{x: randPosX,y: randPosY}});
            }

        });

            shapes.timer.fourPoint += 100;

            if(shapes.timer.fourPoint < 3000) {
                window.setTimeout('rectApp.fourPoint()', 100);
                window.setTimeout('rectApp.drawShapes()', 100);
            } else if (shapes.timer.fourPoint >= 3000) {
                shapes.timer.fourPoint = 0;
                if(shapes.residualMomentum) {window.setTimeout('rectApp.slightDrift()', 1000)};
            }

    }

    shapes.drift = function() {
    
        shapes.rectangles.forEach(function (rectangle) {

            if(rectangle.get('selected')) {

                if(rectangle.get('position').x < (500 * Math.random()) ) {
                    var randPosX = rectangle.get('position').x += (Math.random() * 30);
                    var randPosY = rectangle.get('position').y -= (Math.random() * 30);
                } else {
                    var randPosX = rectangle.get('position').x -= (Math.random() * 30);
                    var randPosY = rectangle.get('position').y += (Math.random() * 30);
                }

                rectangle.set({position:{x: randPosX,y: randPosY}});

            }

        });

        shapes.timer.drift += 100;

        if(shapes.timer.drift < 1000) {
            window.setTimeout('rectApp.drift()', 100);
            window.setTimeout('rectApp.drawShapes()', 100);
        } else if (shapes.timer.drift >= 1000) {
            if(shapes.residualMomentum) {window.setTimeout('rectApp.slightDrift()', 200)};
            shapes.saveShapes();
            shapes.timer.drift = 0;
        }

        // console.log(shapes.timer.drift);
    }

    shapes.slightDrift = function() {
        
        var selectedOnce = false;

        shapes.rectangles.forEach(function (rectangle) {

            if(rectangle.get('selected')) {

                selectedOnce = true;

                if(rectangle.get('position').x < (500 * Math.random()) ) {
                    var randPosX = rectangle.get('position').x += Math.random() * 2;
                    var randPosY = rectangle.get('position').y -= Math.random() * 2;
                } else {
                    var randPosX = rectangle.get('position').x -= Math.random() * 2;
                    var randPosY = rectangle.get('position').y += Math.random() * 2;
                }

                rectangle.set({position:{x: randPosX,y: randPosY}});
            }
        });

        shapes.timer.slightDrift += 1000;

        if(shapes.timer.slightDrift < 8000 && selectedOnce) {
            window.setTimeout('rectApp.slightDrift()', 1000);
            window.setTimeout('rectApp.drawShapes()', 1000);
        } else if (shapes.timer.slightDrift >= 8000) {
            shapes.saveShapes();
            shapes.timer.slightDrift = 0;
        }

        console.log(shapes.timer.slightDrift);

    }

    shapes.enlarge = function() {
        shapes.rectangles.forEach(function (rectangle) {

            if(rectangle.get('selected')) {
                var enlargeWidth = rectangle.get('width') + 10;
                var enlargeHeight = rectangle.get('height') + 10;

                rectangle.set({width: enlargeWidth, height: enlargeHeight});
            }
        });

        shapes.drawShapes();
    }

    shapes.shrink = function() {
        shapes.rectangles.forEach(function (rectangle) {

            if(rectangle.get('selected')) {
                var enlargeWidth = rectangle.get('width') - 10;
                var enlargeHeight = rectangle.get('height') - 10;

                rectangle.set({width: enlargeWidth, height: enlargeHeight});
            }
        });

        shapes.drawShapes();
    }

    shapes.shrinkLarge = function() {
        shapes.rectangles.forEach(function (rectangle) {

            if(rectangle.get('selected')) {

                if(Math.random() < .5) {
                    var enlargeWidth = rectangle.get('width') + 10;
                    var enlargeHeight = rectangle.get('height') + 10;

                    rectangle.set({width: enlargeWidth, height: enlargeHeight});
                } else {
                    var enlargeWidth = rectangle.get('width') - 10;
                    var enlargeHeight = rectangle.get('height') - 10;

                    rectangle.set({width: enlargeWidth, height: enlargeHeight});
                }
            }
        });

        shapes.timer.shrinkLarge += 200

        if(shapes.timer.shrinkLarge < 2000) {
            window.setTimeout('rectApp.shrinkLarge()', 200);
            window.setTimeout('rectApp.drawShapes()', 200);
        } else if (shapes.timer.shrinkLarge >= 2000) {
            if(shapes.residualMomentum) {window.setTimeout('rectApp.slightDrift()', 1000)};
            shapes.saveShapes();
            shapes.timer.shrinkLarge = 0;
        }

        // console.log(shapes.timer.slightDrift);

    }

    shapes.flop = function() {
        shapes.rectangles.forEach(function (rectangle) {

            if(rectangle.get('selected')) {

                rectangle.set({width: rectangle.get('height'), height: rectangle.get('width')});

            }
        });

        shapes.drawShapes();
    }

    shapes.timer = {
        flow: 0,
        drift: 0,
        populate: 0,
        repulse: 0,
        slightDrift: 0,
        shrinkLarge: 0,
        fourPoint: 0,
        imageCycle: 0
    }

    shapes.posX = 114;

    shapes.posY = 543;

    shapes.selectAll = function() {
        shapes.rectangles.forEach(function (rectangle) {
            rectangle.set({selected: true});
        })
        shapes.drawShapes();
    }

    shapes.selectSome = function() {
        shapes.rectangles.forEach(function (rectangle) {
            if(Math.random() < .5) {
                rectangle.set({selected: true});
            }
        })
        shapes.drawShapes();
    }

    shapes.deselectAll = function() {
        shapes.rectangles.forEach(function (rectangle) {
            rectangle.set({selected: false});
        })
        shapes.drawShapes();
    }

    shapes.deselectSome = function() {
        shapes.rectangles.forEach(function (rectangle) {
            if(Math.random() < .5) {
                rectangle.set({selected: false});
            }
        })
        shapes.drawShapes();
    }

    shapes.initDraggable = function() {
        var gridContainer = $("#canvas");

        shapes.draggable = Draggable.create(".rectangle", {
                bounds: gridContainer,
                edgeResistance:1,
                throwProps:true
            })
    }

    // shapes.draggable.addEventListener("dragend", setPosition);

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

    shapes.rectangles.on('change', function (model, col, options) {
        console.log('changed');
    });

    // shapes.rectangles.on('change', function (model, col, options) {
    //     shapes.drawShapes();
    // });

    shapes.rectangles.add(r);

    console.log(shapes.rectangles.length);

    shapes.defaultRect = r;

    shapes.drawShapes();

    // Validate is triggered automatically by Backbone w/ 'set' and 'save' operations.

    // You can pass html directly into 'this.$el.html(<p></p>)'

    // Don't attach views to existing elements

    // Don't access DOM elements that aren't part of the view

})(rectApp);