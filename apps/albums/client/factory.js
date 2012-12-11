App.Factories.albumFactory = {

   showUserSelection : function(){
      var model = new App.Models.UserSelection();
      App.Marionette.container.show(new App.Views.UserSelection({model: model}));
   },

   showAlbumList: function(userId){
      var collection = new App.Models.AlbumCollection({userId: userId});
      collection.fetch({
         error: function(collection, xhr, options){
            throw {model: model, xhr: xhr, options: options}
         },
         success: function(collection, response, options) {
         }
      });
      App.Marionette.container.show(new App.Views.AlbumList({collection: collection}));
   },

   showAlbum : function(albumId){
      var model = new App.Models.Album({userId: userId, albumId: albumId});
      model.fetch({
         error: function(model, xhr, options){
            throw {model: model, xhr: xhr, options: options}
         },
         success: function(model, response, options) {}
      });
      App.Marionette.container.show(new App.Views.Album({model: model}));
   }
};