App.Models.Album = Backbone.Model.extend({
});

App.Collections.AlbumCollection = Backbone.Collection.extend({

   model: App.Models.Album,

   initialize: function(options) {
      this.userId = options.userId;
   },

   url: function() {
      return "https://picasaweb.google.com/data/feed/api/user/" + this.userId + "?alt=json";
   },

   //parses Google's picasa api to create a minimal model
   parse: function(response) {
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