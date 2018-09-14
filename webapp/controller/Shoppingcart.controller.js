sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, History) {
    "use strict";
    return Controller.extend("de.nak.minibar.controller.Shoppingcart", {

         deleteSCItem: function (oEvent){
             var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
             var oModel = this.getView().getModel("minibar");
             var oItem = oEvent.getSource();
             //var sPath = oItem.getBindingContext("minibar").getPath().substr(1);

             oModel.remove("/SHOPPINGCARTSet", oItem)  //DELETE Product from Shopppingcart
             oRouter.navTo("shoppingcart", {path:"SHOPPINGCARTSet"})
         },

        onSelectedItem: function (oEvent){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oModel = this.getView().getModel("minibar");
            var oItem = oEvent.getSource();
            // var MyVariable = oEvent.getParameter("selectedItem").getKey();
            // alert(MyVariable);

            var oProduct = {
                Matnr: "78",
                Amount: "0000000000006"
            }
            alert(oProduct.Matnr);

            oModel.update("/SHOPPINGCARTSet", oProduct)  //Update Product from Shopppingcart
            this.getView().getModel("minibar").refresh();
            oRouter.navTo("shoppingcart", {path:"SHOPPINGCARTSet"})
        },

        // Funktion zum anlegen einer Order mit dem aktuellen Warenkorb
        onOrderButtonPress: function (){
             var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
             var oI18N = this.getView().getModel("i18n").getResourceBundle();
             var oModel = new sap.ui.model.odata.ODataModel('https://r41z.ucc.ovgu.de/sap/opu/odata/sap/ZVG_15D_54_MINIBAR_SRV_01/');
             oModel.callFunction("/checkoutCart", {method:"POST"});
             sap.m.MessageToast.show(oI18N.getText("shoppingcart.PlacedOrder"), {closeOnBrowserNavigation: false});
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
