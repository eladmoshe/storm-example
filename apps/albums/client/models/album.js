App.Models.Album = Backbone.Model.extend({

   initialize: function(options) {
      console.log("created model", options);
      this.albumId = options.albumId;
   },

   url: function() {
      return "https://picasaweb.google.com/data/feed/api/user/" + this.userId + "/albumid/" + this.albumId + "?alt=json";
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
      if (response && response.feed) {
         var real = response.feed.entry;
         console.log("real : ", real);
         real = _.map(response.feed.entry, function(item) {
            return {
               title: item.title.$t
            };
         });

         return real;//response.feed.entry;


      } else {
         console.log("Bad or empty response ", response);
         return null;
      }

   }



});