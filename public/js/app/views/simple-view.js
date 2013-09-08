YUI.add('simple-view', function (Y, NAME) {

var SimpleView = Y.Base.create('simpleView', Y.View, [], {
    events : {
        '.first': {
            click: 'firstLinkClick'
        },
        '.second': {
            click: 'secondLink'
        }
    },
    firstLinkClick: function(e) {
        e.preventDefault();
        Y.log('firstFire');
        this.fire('first', { });
    },
    secondLink: function(e) {
        e.preventDefault();
        Y.log('secondFire');
        this.fire('second', { });
    },
    initializer: function () {
        Y.log('simple view init');
        this.publish('render', {
            broadcast: true,
            bubbles: true,
            emitFacade: true
        });
        this.publish('first', {
            broadcast: true,
            bubbles: true,
            emitFacade: true
        });
        this.publish('second', {
            broadcast: true,
            bubbles: true,
            emitFacade: true
        });


        SimpleView.superclass.constructor.apply(this, arguments);
    },
    onRender: function () {},
    render: function () {
        Y.log('simple view render');
        SimpleView.superclass.render.apply(this, arguments);
        var container,
            model,
            source,
            compiledTemplate,
            html;
        container = this.get('container');

        source = Y.one(this.template).getHTML();

        compiledTemplate = Y.Handlebars.compile(source);
        html = compiledTemplate();
        container.setHTML(html);

        if (!container.inDoc()) {
            Y.one('body').append(container);
        }
        this.fire('render');
        this.onRender();
        return this;
    }
});
Y.SimpleView = SimpleView;

}, '@VERSION@', {"requires": ["view", "handlebars", "node", "event",'event-custom']});