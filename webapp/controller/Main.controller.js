//Autoren Prahl, Knüppel

sap.ui.define([
    "sap/ui/core/mvc/Controller",
], function (Controller) {
    "use strict";
    return Controller.extend("de.nak.minibar.controller.Main", {

        //ausgewählte Kategorie bestimmen und im Pfad mitgeben
        //zur Produktseite navigieren
        onCategoryPress: function (oEvent) {
            var oCategory = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("products", {path: oCategory.getBindingContext("minibar").getPath().substr(1)});
        },

        //zum Warenkorb navigieren
        onSCButtonPress: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("shoppingcart", {path:"SHOPPINGCARTSet"})
        }
    })
});
