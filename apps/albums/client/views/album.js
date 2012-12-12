App.Views.Album = Backbone.Marionette.ItemView.extend({

   template: '#tpl-albums-album',

   tagName: 'li',

   serializeData: function(){
      return {
         title: this.model.get("title"),
         albumUrl: "#user/"+this.model.get("userId")+"/albums/"+this.model.get("id"),
         thumbnail: this.model.get("thumbnail"),
         photoCount: this.model.get("photoCount")
      };
   }
});

App.Views.AlbumList = Backbone.Marionette.CollectionView.extend({

   tagName: 'ul',

   className: 'thumbnails well',

   template: 'tpl-albums-album_container',

   itemView: App.Views.Album
});