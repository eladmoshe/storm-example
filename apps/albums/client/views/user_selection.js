App.Views.UserSelection = Backbone.Marionette.ItemView.extend({

   template: '#tpl-albums-user_selection',

   ui: {
      "submit": "#submit",
      "userId": "#userId"
   },

   serializeData: function(){
      return {
         userId: this.model.get("userId")
      };
   },

   onRender: function() {
      var that = this;
      this.ui.submit.click(function() {
         var userId = that.ui.userId.val();
         if (userId) {
            Backbone.Router.prototype.navigate("user/" + userId + "/albums", {trigger: true})
         }
      })
   }

});