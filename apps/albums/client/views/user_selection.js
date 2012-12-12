App.Views.UserSelection = Backbone.Marionette.ItemView.extend({

   template: '#tpl-albums-user_selection',

   ui: {
      "submit": "#submit",
      "userId": "#userId",
      "help": ".icon-question-sign"
   },

   serializeData: function() {
      return {
         userId: this.model.get("userId")
      };
   },

   onRender: function() {
      var that = this;

      this.$el.i18n();
      this.ui.help.tooltip();//tooltip is a Twitter Bootstrap plugin that must be initialized through javascript

      this.ui.submit.click(function() {
         var userId = that.ui.userId.val();
         if (userId) {
            Backbone.Router.prototype.navigate("user/" + userId + "/albums", {trigger: true})
         }
      });
   }

});