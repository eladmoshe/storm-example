App.Views.Header = Backbone.Marionette.ItemView.extend({

   template: "#tpl-shell-header",

   onRender: function(){
      this.$el.i18n();
   }

});