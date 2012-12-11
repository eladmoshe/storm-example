App.Views.Album = Backbone.Marionette.ItemView.extend({

   template: '#tpl-albums-album',

   tagName: 'li',

   serializeData: function(){
      return {
         title: this.model.get("title"),
         url: this.model.get("url")
      };
   }
});

App.Views.AlbumList = Backbone.Marionette.CollectionView.extend({

   tagName: 'ul',

   itemView: App.Views.Album
});