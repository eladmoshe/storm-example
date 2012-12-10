App.Views.UserSelection = Marionette.ItemView.extend({

   template: '#tpl-albums-user_selection',

   ui: {
      "submit": "#submit",
      "userId": "#userId"
   },

   onRender: function() {
      var that = this;
      this.ui.submit.click(function() {
         var id = that.ui.albumId.val();
         if (id) {
            Backbone.Router.prototype.navigate("album/" + id + "/images", {trigger: true})
         }
      })
   }

});