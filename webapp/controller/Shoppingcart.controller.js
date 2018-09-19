sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox",
    '../model/formatter'
], function (Controller, History, MessageBox, formatter) {
    "use strict";
    return Controller.extend("de.nak.minibar.controller.Shoppingcart", {

        formatter: formatter,

        onUpdateFinished: function(){
            var oTable = this.getView().byId("shoppingcartTable");
            var l = oTable.getItems().length;
            var iTotalPrice = 0;
            for(var i = 0; i < l; i++){
                var aItem = oTable.getItems(i);
                var oItem = aItem[i].getBindingContext("minibar").getObject();
                var iPrice = parseFloat(oItem.Price);
                iTotalPrice = iTotalPrice + iPrice;
            }
            this.getView().byId("shoppingcartTotalPrice").setNumber([formatter.price(iTotalPrice)]);
            this.getView().byId("shoppingcartTotalPrice").setUnit("EUR");
        },

         // Funktion zum Löschen eines Produktes
         deleteSCItem: function (oEvent){
             var oModel = this.getView().getModel("minibar");
             var oI18N = this.getView().getModel("i18n").getResourceBundle();
             var oItem = oEvent.getSource();
             var sPath = oItem.getBindingContext("minibar").getPath();
             var mParameters = {
                 success: function () {
                     MessageBox.success(oI18N.getText("shoppingcart.DeleteSuccess"),{
                         initialFocus: null,
                         textDirection: sap.ui.core.TextDirection.Inherit,
                         onClose: function(sButton) {
                             if (sButton === MessageBox.Action.OK){
                                 //Nichts tun
                             }
                         }
                     });
                 },
                 error: function (oError) {
                     var sMessage = JSON.parse(oError.responseText).error.message.value;
                     MessageBox.error(sMessage);
                 }
             };
             oModel.remove(sPath, mParameters);
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
            };
            var mParameters = {
                error: function (oError) {
                    var sMessage = JSON.parse(oError.responseText).error.message.value;
                    MessageBox.error(sMessage);
                }
            };
            oModel.update(sPath, oProduct, mParameters);
        },

        // Funktion zum anlegen einer Order mit dem aktuellen Warenkorb
        onOrderButtonPress: function (){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oI18N = this.getView().getModel("i18n").getResourceBundle();
            var oModel = new sap.ui.model.odata.ODataModel('https://r41z.ucc.ovgu.de/sap/opu/odata/sap/ZVG_15D_54_MINIBAR_SRV_01/');
            var that = this;
            MessageBox.confirm(oI18N.getText("shoppingcart.OrderQuestion"),{
                title: "",
                initialFocus: null,
                textDirection: sap.ui.core.TextDirection.Inherit,
                onClose: function(sButton) {
                    if (sButton === MessageBox.Action.OK) {
                        oModel.callFunction("/checkoutCart", {
                            method: "POST",
                            success: function () {
                                MessageBox.success(oI18N.getText("shoppingcart.PlacedOrder"), {
                                    title: "",
                                    initialFocus: null,
                                    textDirection: sap.ui.core.TextDirection.Inherit,
                                    onClose: function (sButton) {
                                        if (sButton === MessageBox.Action.OK) {
                                            that.getView().getModel("minibar").refresh();
                                            oRouter.navTo("main", {}, true);
                                        }
                                    }
                                });
                            },
                            error: function (oError) {
                                var sResponseBody = oError.response.body;
                                var aMessage = sResponseBody.match(/.*\<message.*\>([a-zA-Z\s\.]*)\<\/message\>.*/);
                                var sMessage = aMessage[1];
                                MessageBox.error(sMessage);
                            }
                        });
                    } else if (sButton === MessageBox.Action.CANCEL) {
                        //Nichts tun
                    }
                }
            });
        },

        onNavButtonPress: function () {
            // Check if there is UI5 history
            var history = History.getInstance();
            var previousHash = history.getPreviousHash();

            // If UI5 recorded previous pages, simply go back in history...
            if (previousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("main", {}, true);
            }
        }
    })
});
