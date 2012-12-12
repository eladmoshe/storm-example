App.UiFactories.albumFactory = {

   showUserSelection: function() {
      var model = new App.Models.UserSelection();
      App.Marionette.container.show(new App.Views.UserSelection({model: model}));
   },

   showAlbumList: function(userId) {
      var collection = new App.Collections.AlbumCollection({userId: userId});
      collection.fetch({
         error: function(collection, xhr, options) {
            throw {collection: collection, xhr: xhr, options: options}
         },
         success: function(collection, response, options) {
         }
      });
      App.Marionette.container.show(new App.Views.AlbumList({collection: collection}));
   },

   showAlbumImages: function(userId, albumId) {
      var Collection = new App.Collections.ImageList({userId: userId, albumId: albumId});
      Collection.fetch({
         error: function(model, xhr, options) {
            throw {model: model, xhr: xhr, options: options}
         },
         success: function(model, response, option) {

         }
      });
      App.Marionette.container.show(new App.Views.ImageList({collection: Collection}));
   }
};