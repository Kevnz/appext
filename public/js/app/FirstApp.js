YUI.add('first-app', function (Y) {
    var firstView  = Y.Base.create('firstView', Y.View, [], {
      render: function () {
        var container, message, source, html;
              console.log('view');
        container = this.get('container');
        message = this.get('message');
        html =  '<b>The Message is ' + message + ' </b>';
            console.log(html);
        container.setHTML(html);
        if (!container.inDoc()) {
          Y.one('body').append(container);
        } else {
          return this;
        }
        return this;
      }
  });
  Y.FirstApp = Y.Base.create('firstApp', Y.App, [], {
    views: {
        first: {
            type: firstView
        }
    },
    showFirst: function (req, res, next) {
      Y.log('show first');
      this.showView('first', { message: 'First App and First Route' });
    },
    initializer: function () {
          Y.log('init first'); 
          Y.log(this.views);
    }
  }, {
    ATTRS: {
      routes: {
        value: [
          { path:'/first', callbacks:'showFirst' }
        ]
      }
    }
  });
}, '0.0.0', { requires:['app-base']});