$.i18n.init({
      lng:'en', // defaults to get from navigator
      fallbackLng:'en', // defaults to 'dev'
      ns:'translation',
      // resGetPath: 'translate.json',			// defaults to 'locales/__lng__/__ns__.json' where ns = translation (default)
      useLocalStorage:false, // defaults to true
      debug:true                            // last but not least get some information if things go wrong
   },
   function () {
      App.Marionette.start();
      // Process routes only after we have a session at hand
      Backbone.history.start();
   });
})
;
