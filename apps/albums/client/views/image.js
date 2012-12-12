App.Views.Image = Backbone.Marionette.ItemView.extend({

   tagName: "li",

   template: '#tpl-albums-image',

   serializeData: function(options) {
      return {
         thumbnail: this.model.get("thumbnail"),
         title: this.model.get("title")
      }
   }
});

App.Views.ImageList = Backbone.Marionette.CollectionView.extend({

   tagName: "ul",

   className: "thumbnails",

   itemView: App.Views.Image
});