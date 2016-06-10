var timerApp = {};

(function (timerobject) {

    var RefreshingView = Backbone.View.extend({
        initialize: function() {
            this.model.on('change', function() {
                this.render();   
            }, this);
        },
        render: function() {
            this.$el.html(this.model.get('time'));
        }
    })

    var textModel = new Backbone.Model({time: new Date().toString()});
    var viewInstance = new RefreshingView({model: textModel, el: '#timer'});
    viewInstance.render();

    timerobject.textModel = textModel;

    setInterval(function() {
        timerobject.textModel.set({time: new Date().toString()})
    }, 500);

    timerobject.textModel.on('change', function (model, col, options) {
        // rectApp.saveShapes();
    });

}) (timerApp);