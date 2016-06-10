(function () {
        document.onmousemove = mouse_position;
        document.onkeypress = getChar;

        function getChar(event) {
          if (event.which == null) {
            rectApp.currentKey = event.keyCode // IE
          } else if (event.which!=0 && event.charCode!=0) {
            rectApp.currentKey = event.which   // the rest
          } else {
            rectApp.currentKey = null // special key
          }

          if(rectApp.currentKey === 54) {
            rectApp.moveRight();
          }

          if(rectApp.currentKey === 52) {
            rectApp.moveLeft();
          }

          if(rectApp.currentKey === 50) {
            rectApp.moveDown();
          }

          if(rectApp.currentKey === 56) {
            rectApp.moveUp();
          }

          console.log(rectApp.currentKey);
        }

        function mouse_position(e) {

        rectApp.posX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        rectApp.posY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

        }
})()