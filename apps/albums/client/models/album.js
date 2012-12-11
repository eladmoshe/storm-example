App.Models.Album = Backbone.Model.extend({

   initialize: function(options) {
      this.albumId = options.albumId;
   },

   url: function() {
      return "https://picasaweb.google.com/data/feed/api/user/" + this.userId + "/albumid/" + this.id + "?alt=json";
   }
});

App.Models.AlbumCollection = Backbone.Collection.extend({

   model: App.Models.Album,

   initialize: function(options) {
      this.userId = options.userId;
   },

   url: function() {//112560626781695473926
      return "https://picasaweb.google.com/data/feed/api/user/" + this.userId + "?alt=json";
   },

   parse: function(response) {
      console.log("raw response", response);
      if (response && response.feed) {
         return _.map(response.feed.entry, function(item) {
            return {
               title: item.title.$t,
               id: item.gphoto$id.$t,
               userId: item.gphoto$user.$t
            };
         });
      } else {
         console.log("Bad or empty response ", response);
         return null;
      }

   }



});