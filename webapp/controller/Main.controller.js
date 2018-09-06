sap.ui.define([
    "sap/ui/core/mvc/Controller",
], function (Controller) {
    "use strict";
    return Controller.extend("de.nak.minibar.controller.Main", {
        onItemPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("detail", {
                path: oItem.getBindingContext("hotel").getPath().substr(1)
            });
        }

    })
});
