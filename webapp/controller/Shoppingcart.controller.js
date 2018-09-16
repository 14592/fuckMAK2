sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox"
], function (Controller, History, MessageBox) {
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
             var that = this;
             // var oErrors = {
             //     success: function (oData, oResponse) {
             //         MessageToast.show(oI18N.getText("shoppingcart.PlacedOrder"));
             //         this.getView().getModel("minibar").refresh();
             //         oRouter.navTo("main", {}, true);
             //     },
             //     error: function (oError) {
             //         MessageToast.show(that.parseErrorMessage(oError), MessageBox.Icon.ERROR, oI18N.getText("shoppingcart.FailedPlacedOrder"));
             //     }
             // }
             oModel.callFunction("/checkoutCart", {method:"POST"});
             var that = this;
             MessageBox.confirm(oI18N.getText("shoppingcart.OrderQuestion"),{
                 title: "",
                 initialFocus: null,
                 textDirection: sap.ui.core.TextDirection.Inherit,
                 onClose: function(sButton){
                     if (sButton === MessageBox.Action.OK){
                         MessageBox.success(oI18N.getText("shoppingcart.PlacedOrder"),{
                             title: "",
                             initialFocus: null,
                             textDirection: sap.ui.core.TextDirection.Inherit,
                             onClose: function(sButton){
                                 if (sButton === MessageBox.Action.OK){
                                     that.getView().getModel("minibar").refresh();
                                     oRouter.navTo("main", {}, true);
                                 };
                             }
                         });
                     }else if (sButton === MessageBox.Action.CANCEL){
                        //Nichts tun
                     };
                 }
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
                oRouter.navTo("products", {}, true);
            }
        }
    })
});
