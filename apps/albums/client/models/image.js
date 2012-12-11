App.Models.Image = Backbone.Model.extend({

   initialize: function(options) {
   }

});

App.Collections.ImageList = Backbone.Collection.extend({

   model: App.Models.Image,

   initialize: function(options) {
      this.userId = options.userId;
      this.albumId = options.albumId;
   },


   url: function() {
      return "https://picasaweb.google.com/data/feed/api/user/" + this.userId + "/albumid/" + this.albumId + "?alt=json";
   },

   parse: function(response) {
      console.log("raw response", response);
      if (response && response.feed) {
         return _.map(response.feed.entry, function(item) {
            return {
               id: item.gphoto$id.$t,
               title: item.title.$t,
               thumbnail: item.media$group.media$thumbnail[2].url
            };
         })
      } else {
         console.log("Bad or empty response ", response);
         return null;
      }
   }
});