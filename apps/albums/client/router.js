App.Routers.GalleriesRouter = Backbone.Router.extend({

   routes: {
      "": "albumSelection",
      "album/:albumId/images": "albumView"
   },

   gallerySelection: function() {
      App.Factories.galleryFactory.showGallerySelection();
   },

   galleryView: function(galleryId){
      App.Factories.galleryFactory.showGallery(galleryId);
   }
});

//marionette initializers are guaranteed to run only after the application is started
App.Marionette.addInitializer(function() {
   App.Routers.requirementsRouter = new App.Routers.GalleriesRouter();
});

