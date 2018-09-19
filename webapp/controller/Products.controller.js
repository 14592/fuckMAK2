sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
], function (Controller, History) {
    "use strict";
    return Controller.extend("de.nak.minibar.controller.Products", {

        onSCButtonPress: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("shoppingcart", {path:"SHOPPINGCARTSet"})
        },

        onUpdateFinished: function(){
            var oI18N = this.getView().getModel("i18n").getResourceBundle();
            var oTable = this.getView().byId("productsTable");
            var l = oTable.getItems().length;
            for(var i = 0; i < l; i++){
                var aItem = oTable.getItems(i);
                var oItem = aItem[i].getBindingContext("minibar").getObject();
                var sPstock = oItem.Pstock;
                if (sPstock === "X"){
                    //this.getView().byId("shoppingcartTotalPrice").setText(oI18N.getText("products.Available"));
                }else {
                    //this.getView().byId("shoppingcartTotalPrice").setText(oI18N.getText("products.NotAvailable"));
                }
            }

        },

        onItemPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("detail", {
                path: oItem.getBindingContext("minibar").getPath().substr(1)
            });
        },

        onNavButtonPress: function () {
            // Check if there is UI5 history
            var history = History.getInstance();
            var previousHash = history.getPreviousHash();

            // If UI5 recorded previous pages, siply go back in history...
            if (previousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("main", {}, true);
            }
        }
    })
});
