sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
], function (Controller, History) {
    "use strict";
    return Controller.extend("de.nak.minibar.controller.Shoppingcart", {

         // Funktion zum Löschen eines Produktes
         deleteSCItem: function (oEvent){
             var oModel = this.getView().getModel("minibar");
             var oItem = oEvent.getSource();
             var sPath = oItem.getBindingContext("minibar").getPath();
             oModel.remove(sPath);
             this.getView().getModel("minibar").refresh();
         },

        onChangeProductAmount: function (oEvent){
            var oModel = this.getView().getModel("minibar");
            var oItem = oEvent.getSource();
            var oItemProductObject = oItem.getBindingContext("minibar").getObject();
            var sPath = oItem.getBindingContext("minibar").getPath();
            var sAmount = oEvent.getSource().getSelectedItem().getText();
            var oProduct = {
                Matnr: oItemProductObject.Matnr,
                Amount: sAmount
            }
            oModel.update(sPath, oProduct);
            this.getView().getModel("minibar").refresh();
        },

        // Funktion zum anlegen einer Order mit dem aktuellen Warenkorb
        onOrderButtonPress: function (){
             var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
             var oI18N = this.getView().getModel("i18n").getResourceBundle();
             var oModel = new sap.ui.model.odata.ODataModel('https://r41z.ucc.ovgu.de/sap/opu/odata/sap/ZVG_15D_54_MINIBAR_SRV_01/');
             oModel.callFunction("/checkoutCart", {method:"POST"});
     //TODO: import setzen
             sap.m.MessageToast.show(oI18N.getText("shoppingcart.PlacedOrder"));
             this.getView().getModel("minibar").refresh();
             oRouter.navTo("main", {}, true);

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
                oRouter.navTo("products", {}, true);
            }
        }
    })
});
