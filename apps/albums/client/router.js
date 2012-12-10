App.Routers.AlbumsRouter = Backbone.Router.extend({

   routes: {
      "": "userSelection",
      "album/:albumId/images": "albumView"
   },

   userSelection: function() {
      App.Factories.albumFactory.showUserSelection();
   },

   albumView: function(galleryId){
      App.Factories.albumFactory.showAlbum(galleryId);
   }
});

//marionette initializers are guaranteed to run only after the application is started
App.Marionette.addInitializer(function() {
   App.Routers.albumsRouter = new App.Routers.AlbumsRouter();
});

