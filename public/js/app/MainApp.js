YUI().use('first-app', 'second-app', 'app-extend', 'simple-view', function (Y) {
        // body...

  Y.MainApp = Y.AppExtend.create('mainApp', Y.App, [Y.FirstApp, Y.SecondApp], {
    views: {
        main: {
            type: Y.SimpleView
        }
    },
    showMain: function (req, res, next) {
      console.log('show main');
      this.showView('main', {template: '#main-template', message: 'Main App and Main Route' });
    },
    initializer: function () {
        Y.log('init of Main App');
        var self = this;
 
 
        Y.on('simpleView:first', function() {
            Y.log('first Y.on catcher');
            self.save('/first');
        });
        Y.on('simpleView:second', function() {
            console.log(arguments);
            Y.log('second catcher');
            self.save('/second');

        });
    }
  }, {
    ATTRS: {
      routes: {
        value: [
          { path:'/', callbacks:'showMain' }
        ]
      }
    }
  });


  var app = new Y.MainApp({container:'#app'});

  app.render();
  app.save('/');
});