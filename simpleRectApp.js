var rectApp = {};

(function (shapes) {
    shapes.Rectangle = Backbone.Model.extend({
        area: function () {
          return this.get('length') * this.get('width');
        }
    });
})(app);