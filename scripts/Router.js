(function () {

        var documents = [
            new Backbone.Model({
                title: 'rectangle',
                content: 'blue'
            }),
            new Backbone.Model({
                title: 'triangle',
                content: 'green'
            })
        ];

        var eventAggregator = _.extend({}, Backbone.Events);

        var ContentsView = Backbone.View.extend({
            tagName: 'ul',
            render: function () {
                _(this.collection).each(function (document) {
                    this.$el.append(new DocumentListView({model: document}).render().el)
                }, this);
                return this;
            }
        });

        var DocumentListView = Backbone.View.extend({
            tagName: 'li',
            events: {
                'click': function(){
                    eventAggregator.trigger('document:selected', this.model);
                }
            },
            render: function () {
                this.$el.html(this.model.get('title'));
                return this;
            }
        });

        var DocumentView = Backbone.View.extend({
            render: function () {
                this.$el.append(this.make('h1', null, this.model.get('title')));
                this.$el.append(this.make('div', null, this.model.get('content')));
                $('#router').append("<h1>"+ this.model.get('title')+ "</h1>");
                $('#router').append(this.model.get('content'));
                return this;
            }
        });

        var DocumentRouter = Backbone.Router.extend({
            routes: {
                'contents': 'contents',
                'view/:title': 'viewDocument',
                'search/:query': 'search'
            },
            contents: function() {
                $('#router').html(new ContentsView({collection: documents}).render().el)
            },

            viewDocument: function (title) {
                var selectedDocument = _(documents).find(function (document) {
                    return document.get('title') === title;
                });

                $('#router').empty().append(new DocumentView({model: selectedDocument}).render().el);
            },
            search: function (query) {
                console.log('search for ' + query);
            }
        });

        eventAggregator.on('document:selected', function(document) {
            var urlPath = 'view/' + document.get('title');
            router.navigate(urlPath, {trigger:true});
        });

        var router = new DocumentRouter();
        Backbone.history.start();

        router.navigate('contents', {trigger:true});
})()