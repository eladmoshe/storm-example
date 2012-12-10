App.Models.Album = Backbone.Model.extend({

   initialize: function(options){
      this.albumId = options.albumId;
   },

   url: function(){
      return "https://picasaweb.google.com/data/feed/api/user/"+this.userId+"/albumid/"+this.albumId+"?alt=json";
   }


});

App.Models.AlbumCollection = Backbone.Collection.extend({

   model: App.Models.Album,

   url: function(){
      return "https://picasaweb.google.com/data/feed/api/user/112560626781695473926?alt=json"
   }


});