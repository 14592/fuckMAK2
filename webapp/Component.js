sap.ui.define([
    "sap/ui/core/UIComponent",
], function (UIComponent) {
    "use strict";
    return UIComponent.extend("de.nak.minibar.Component", {
        metadata: {
            manifest: "json"
        },
        init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            //intialize the router
            this.getRouter().initialize();

        }
    });
});
