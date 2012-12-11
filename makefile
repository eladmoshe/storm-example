#----------- User targets

public_debug: public_struct vendor_debug index.html app_debug translation.json

app_debug:
	@$(INFO) "Generating $(APP_TARGET)\n"
	@cat $(LAYOUT_PATH)/js/app.prefix.js > $(APP_TARGET);
	@cat $(CONFIG_PATH)/client/development.js >> $(APP_TARGET);
	@find common/client -name "*.js" | sort | while read name; do echo ""; echo "//-------------  $$name  ------------"; echo ""; cat "$$name"; echo ""; done >> $(APP_TARGET)
	@find apps/**/client -name "*.js" | sort | while read name; do echo ""; echo "//-------------  $$name  ------------"; echo ""; cat "$$name"; echo ""; done >> $(APP_TARGET)
	@cat $(LAYOUT_PATH)/js/app.postfix.js >> $(APP_TARGET);

app_release:
	@$(INFO) "Generating $(APP_TARGET)\n"
	@cat $(LAYOUT_PATH)/js/app.prefix.js > $(APP_TARGET);
	@cat $(CONFIG_PATH)/client/production.js >> $(APP_TARGET);
	@find common/client -name "*.js" | sort | while read name; do echo ""; echo "//-------------  $$name  ------------"; echo ""; cat "$$name"; echo ""; done >> $(APP_TARGET)
	@find apps/**/client -name "*.js" | sort | while read name; do echo ""; echo "//-------------  $$name  ------------"; echo ""; cat "$$name"; echo ""; done >> $(APP_TARGET)
	@cat $(LAYOUT_PATH)/js/app.postfix.js >> $(APP_TARGET);

index.html:
	@$(INFO) "building index.html\n"
	@$(eval TEMP_ASSETS_FILE := $(shell mktemp -t stormXXXXXXXXXX))
	@find apps/**/client -name "*.jade" | sort | xargs -L1 -n2 -I % env val=% awk 'BEGIN {n=split(ENVIRON["val"],arr,"[./]") ; print "<script type=\"text/x-template\" id=\"tpl-" arr[n-4]"-"arr[n-1] "\">"}; {print } END {print "</script>"}' % > $(TEMP_ASSETS_FILE) ; find common/client -name "*.jade" | sort | xargs -L1 -n2 -I % env val=% awk 'BEGIN {n=split(ENVIRON["val"],arr,"[./]") ; print "<script type=\"text/x-template\" id=\"tpl-" arr[n-4]"-"arr[n-1] "\">"}; {print } END {print "</script>"}' % >> $(TEMP_ASSETS_FILE) ; sed -e '/@@TEMPLATES@@/r '$(TEMP_ASSETS_FILE) -e '/@@TEMPLATES@@/d' $(HTML_LAYOUT) > $(HTML_OUTPUT) ; rm $(TEMP_ASSETS_FILE)

translation.json:
	@$(INFO) "Generating translation files\n"
	@mkdir -p $(PUBLIC_PATH)/locales/en
	@echo "{" > $(PUBLIC_PATH)/locales/en/$(TRANSLATION_FILE)
	@find apps/**/client/locales/en -name "$(TRANSLATION_FILE)" | sort | while read name; do echo ""; cat "$$name"; echo ","; done >> $(PUBLIC_PATH)/locales/en/$(TRANSLATION_FILE)
	@echo "\"Dummy\":null}" >> $(PUBLIC_PATH)/locales/en/$(TRANSLATION_FILE)
	@mkdir -p $(PUBLIC_PATH)/locales/de
	@echo "{" > $(PUBLIC_PATH)/locales/de/$(TRANSLATION_FILE)
	@find apps/**/client/locales/de -name "$(TRANSLATION_FILE)" | sort | while read name; do echo ""; cat "$$name"; echo ""; done >> $(PUBLIC_PATH)/locales/de/$(TRANSLATION_FILE)
	@echo "}" >> $(PUBLIC_PATH)/locales/de/$(TRANSLATION_FILE)

public_struct:
	@$(INFO) "restructuring public folder\n"
	@rm -Rf $(PUBLIC_PATH)
	@mkdir $(PUBLIC_PATH) ; mkdir $(PUBLIC_PATH)/js ; mkdir $(PUBLIC_PATH)/js/lib ; mkdir $(PUBLIC_PATH)/css ; mkdir $(PUBLIC_PATH)/img ; mkdir $(PUBLIC_PATH)/fonts

vendor_debug: public_struct index.html stylesheets
	@$(INFO) "populating public - debug\n"
	@cp $(VENDOR_PATH)/jquery/jquery.js $(PUBLIC_PATH)/js/lib/jquery.js
	@cp $(VENDOR_PATH)/bootstrap/js/bootstrap.js $(PUBLIC_PATH)/js/lib/bootstrap.js
	@cp $(VENDOR_PATH)/underscore/underscore.js $(PUBLIC_PATH)/js/lib/underscore.js
	@cp $(VENDOR_PATH)/backbone/backbone.js $(PUBLIC_PATH)/js/lib/backbone.js
	@cp $(VENDOR_PATH)/jade/jade.js $(PUBLIC_PATH)/js/lib/jade.js
	@cp $(VENDOR_PATH)/i18next/i18next.js $(PUBLIC_PATH)/js/lib/i18next.js
	@cp $(VENDOR_PATH)/marionette/backbone.marionette.js $(PUBLIC_PATH)/js/lib/backbone.marionette.js

vendor_release: public_struct index.html stylesheets
	@$(INFO) "populating public - release\n"
	@cp $(VENDOR_PATH)/jquery/jquery.min.js $(PUBLIC_PATH)/js/lib/jquery.js
	@cp $(VENDOR_PATH)/bootstrap/js/bootstrap.min.js $(PUBLIC_PATH)/js/lib/bootstrap.js
	@cp $(VENDOR_PATH)/underscore/underscore-min.js $(PUBLIC_PATH)/js/lib/underscore.js
	@cp $(VENDOR_PATH)/backbone/backbone-min.js $(PUBLIC_PATH)/js/lib/backbone.js
	@cp $(VENDOR_PATH)/jade/jade.min.js $(PUBLIC_PATH)/js/lib/jade.js
	@cp $(VENDOR_PATH)/i18next/i18next.min.js $(PUBLIC_PATH)/js/lib/i18next.js
	@cp $(VENDOR_PATH)/marionette/backbone.marionette.min.js $(PUBLIC_PATH)/js/lib/backbone.marionette.js

stylesheets:
	@$(INFO) "Building stylesheets\n"
	@$(eval TEMP_ASSETS_FILE := $(shell mktemp -t stormXXXXXXXXXX))
	@find $(COMMON_PATH)/client -name "*.less" | sort | while read name; do echo ""; echo "/*-------------  $$name  ------------*/"; echo ""; cat "$$name"; echo ""; done >> $(TEMP_ASSETS_FILE)
	@find apps/**/client -name "*.less" | sort | while read name; do echo ""; echo "/*-------------  $$name  ------------*/"; echo ""; cat "$$name"; echo ""; done >> $(TEMP_ASSETS_FILE)
	@node_modules/less/bin/lessc $(TEMP_ASSETS_FILE) > $(STYLESHEETS_TARGET)
	@cp $(VENDOR_PATH)/bootstrap/css/bootstrap.css $(PUBLIC_PATH)/css/bootstrap.css
	@cp $(VENDOR_PATH)/bootstrap/css/bootstrap-responsive.css $(PUBLIC_PATH)/css/bootstrap-responsive.css

#----------------------------------------------------------
# Paths
PUBLIC_PATH = public
VENDOR_PATH = vendor
COMMON_PATH = common
LAYOUT_PATH = layout
DEPLOY_PATH = deploy
LOG_PATH = log
CONFIG_PATH = config
NULL_REDIRECT = > /dev/null 2> /dev/null
HTML_LAYOUT = $(LAYOUT_PATH)/index.html
HTML_OUTPUT = $(PUBLIC_PATH)/index.html

APP_TARGET = $(PUBLIC_PATH)/js/app.js
STYLESHEETS_TARGET = $(PUBLIC_PATH)/css/styles.css

TEST_RUNNER_DEBUG = node_modules/mocha/bin/mocha --debug-brk -r should -R spec
TEST_RUNNER = node_modules/mocha/bin/mocha -r should -R spec
CI_TEST_RUNNER = node_modules/mocha/bin/mocha -r should -R tap
TRANSLATION_FILE = translation.json


#----------------------------------------------------------
# colors and color related macros
APP_NAME = Storm

NO_COLOR=\33[0m
INFO_COLOR=\33[36;01m
SUBJECT_COLOR=\33[33;01m
OK_COLOR=\33[32;01m
ERROR_COLOR=\33[31;01m
WARN_COLOR=\33[33;01m

OK_STRING=$(OK_COLOR)[OK]$(NO_COLOR)
ERROR_STRING=$(ERROR_COLOR)[ERRORS]$(NO_COLOR)
WARN_STRING=$(WARN_COLOR)[WARNINGS]$(NO_COLOR)

INFO = printf "$(INFO_COLOR)[$(APP_NAME)]$(NO_COLOR) " ; printf
ERR = printf "/$(ERROR_COLOR)[$(APP_NAME)]$(NO_COLOR) " ; printf
#----------------------------------------------------------

