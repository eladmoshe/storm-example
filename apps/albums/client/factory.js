App.Factories.albumFactory = {

   showUserSelection : function(){
      App.Marionette.container.show(new App.Views.UserSelection());
   },

   showAlbum : function(albumId){
      var model = new App.Models.Album({albumId: albumId});
      model.fetch({
         error: function(model, xhr, options){
            throw {model: model, xhr: xhr, options: options}
         },
         success: function(model, response, options) {}
      });
      App.Marionette.container.show(new App.Views.Album({model: model}));
   }
};