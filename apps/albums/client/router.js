App.Routers.AlbumsRouter = Backbone.Router.extend({

   routes: {
      "": "userSelection",
      "user/:userId/albums": "albumsListView"
   },

   userSelection: function() {
      App.Factories.albumFactory.showUserSelection();
   },

   albumsListView: function(userId){
      App.Factories.albumFactory.showAlbumList(userId);
   }
});

//marionette initializers are guaranteed to run only after the application is started
App.Marionette.addInitializer(function() {
   App.Routers.albumsRouter = new App.Routers.AlbumsRouter();
});

