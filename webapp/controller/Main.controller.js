sap.ui.define([
    "sap/ui/core/mvc/Controller",
], function (Controller) {
    "use strict";
    return Controller.extend("de.nak.minibar.controller.Main", {
        onItemPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("products", {
                path: oItem.getBindingContext("minibar").getPath().substr(1)
            });
        },
        onSCButtonPress: function (evt) {
            var oButton = evt.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("shoppingcard", {
                path: oButton.getBindingContext("minibar").getPath().substr(1)
            });
        }
/*          jQuery.sap.require("sap.m.MessageToast");
            sap.m.MessageToast.show(evt.getSource().getId() + " Pressed");*/
        // onSCButtonClick: function (oEvent) {
        //     var oButton = oEvent.getSource();
        //     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        //     oRouter.navTo("shoppingcard", {
        //         path: oButton.getBindingContext("minibar").getPath().substr(1)
        //     })
        // }
    })
});
