$(function () {
   window.App = {
      Factories:{},
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

   //cache the template so that we only create in once
   Backbone.Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
      return jade.compile(rawTemplate);
   };

   //handle internationalization by translating all i18n keys in the markup
   Backbone.Marionette.View.prototype.onRender = function () {
      $(this.el).i18n();
   };


   App.Marionette.addRegions({
      header:"#header",
      container:"#container"
   });

