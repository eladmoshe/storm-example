App.Views.Image = Backbone.Marionette.ItemView.extend({

   template: '#tpl-albums-image',

   serializeData: function(options) {
      console.log("model",this.model.attributes);
      return {
         thumbnail: this.model.get("thumbnail"),
         title: this.model.get("title")
      }
   }

});

App.Views.ImageList = Backbone.Marionette.CollectionView.extend({

   itemView: App.Views.Image
});