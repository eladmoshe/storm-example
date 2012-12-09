$(function () {
   window.App = {
      Controllers:{},
      Views:{},
      Models:{},
      Collections:{},
      Routers:{},
      Events:_.extend({}, Backbone.Events),
      Registry:{
         display:[],
         routes:[]
      },
      Infrastructure: {},
      urls: {},
      analytics: {},
      charts: {}
   };

   App.Marionette = new Backbone.Marionette.Application();

   Backbone.Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
      return jade.compile(rawTemplate);
   };

   Backbone.Marionette.View.prototype.onRender = function () {
      $(this.el).i18n();
   };


   App.Marionette.addRegions({
      header:"#header",
      container:"#container"
   });

App.Config = {
   isDebug: true
};
//-------------  apps/galleries/client/factory.js  ------------



//-------------  apps/galleries/client/globals.js  ------------



//-------------  apps/galleries/client/router.js  ------------


$.i18n.init({
      lng:'en', // defaults to get from navigator
      fallbackLng:'en', // defaults to 'dev'
      ns:'translation',
      // resGetPath: 'translate.json',			// defaults to 'locales/__lng__/__ns__.json' where ns = translation (default)
      useLocalStorage:false, // defaults to true
      debug:true                            // last but not least get some information if things go wrong
   },
   function () {
      App.Marionette.start();
      // Process routes only after we have a session at hand
      App.Events.on('accounts:newSession',function initBackboneHistory() {
         Backbone.history.start();
         App.Events.off('accounts:newSession',initBackboneHistory);
      });
   });
})
;
