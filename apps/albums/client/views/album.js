App.Views.Album = Backbone.Marionette.ItemView.extend({

   template: '#tpl-albums-album',

   serializeData: function(){
      return {
         title: this.model.get("title").$t
      };
   },

   initialize: function(options){
      console.log("rendered single album view ", this.options);
   }
});

App.Views.AlbumList = Backbone.Marionette.CollectionView.extend({

   tagName: 'div',

   itemView: App.Views.Album,

   onRender:function(){
      console.log("rendering album list", this.options);
   }
});