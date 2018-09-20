//Autoren: Prahl, Janeck, Knüppel

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox",
    '../model/formatter'
], function (Controller, History, MessageBox, formatter) {
    "use strict";
    return Controller.extend("de.nak.minibar.controller.Shoppingcart", {
        //formatter Aufruf
        formatter: formatter,

        //nach dem Laden der Warenkorbtabelle alle Produktpreise auslesen, addieren
        //und in den footer der Tabelle schreiben
        onUpdateFinished: function(){
            var oTable = this.getView().byId("shoppingcartTable");
            var sLength = oTable.getItems().length;
            var iTotalPrice = 0;
            for(var i = 0; i < sLength; i++){
                var aItem = oTable.getItems(i);
                var oItem = aItem[i].getBindingContext("minibar").getObject();
                var iPrice = parseFloat(oItem.Price);
                iTotalPrice = iTotalPrice + iPrice;
            }
            this.getView().byId("shoppingcartTotalPrice").setNumber([formatter.price(iTotalPrice)]);
            this.getView().byId("shoppingcartTotalPrice").setUnit("EUR");
        },

        //Löschen des ausgewählten Produktes der Warenkorbtabelle
        //Rückmeldung, ob das Löschen erfolgreich war oder ein Fehler aufgetreten ist (anzeigen welcher)
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

        //setzt die neu festgelegte Bestellmenge des ausgewählten Produktes
        //meldet einen Fehler, falls einer auftreten sollte
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

        //Legt eine neuer Ordner mit den im Warenkorb befindlichen Produkten an
        //Abfrage, ob wirklich bestellt werden soll
        //Rückmeldung, ob die Bestellung erfolgreich war
        //bei auftreten eines Fehlers, wird dieser angezeigt
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

        //in der Historie zurückgehen
        //falls keine Historie vorhanden ist, auf die main Seite zurückkehren
        onNavButtonPress: function () {
            var history = History.getInstance();
            var previousHash = history.getPreviousHash();
            if (previousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("main", {}, true);
            }
        }
    })
});
