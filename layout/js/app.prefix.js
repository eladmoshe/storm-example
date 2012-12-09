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

