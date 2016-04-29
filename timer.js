(function () {

    var RefreshingView = Backbone.View.extend({
        initialize: function() {
            this.model.on('change', function() {
                this.render();   
            }, this);
        },
        render: function() {
            this.$el.html(this.model.get('text'));
        }
    })

    var textModel = new Backbone.Model({text: new Date().toString()});
    var viewInstance = new RefreshingView({model: textModel, el: '#timer'});
    viewInstance.render();

    setInterval(function() {
        textModel.set({text: new Date().toString()})
    }, 1000);

}) ();