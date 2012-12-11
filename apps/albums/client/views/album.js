App.Views.Album = Backbone.Marionette.ItemView.extend({

   template: '#tpl-albums-album',

   tagName: 'li',

   serializeData: function(){
      return {
         title: this.model.get("title"),
         albumUrl: "#user/"+this.model.get("userId")+"/albums/"+this.model.get("id")
      };
   }
});

App.Views.AlbumList = Backbone.Marionette.CollectionView.extend({

   tagName: 'ul',

   itemView: App.Views.Album
});