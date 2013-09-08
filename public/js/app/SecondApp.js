YUI.add('second-app', function (Y) {
    var secondView  = Y.Base.create('secondView', Y.View, [], {
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
   Y.SecondApp = Y.Base.create('secondApp', Y.App, [], {
    views: {
        second: {
            type: secondView
        }
    },
    showSecond: function (req, res, next) {
      console.log('show second');
      this.showView('second', {message: 'Second App and Second Route' });
    },
    initializer: function () {
        Y.log('init of Second App');
    }
  }, {
    ATTRS: {
      routes: {
        value: [
          { path:'/second', callbacks:'showSecond' }
        ]
      }
    }
  });
}, '0.0.0', { requires:['app-base']});