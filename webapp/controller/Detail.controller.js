sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    '../model/formatter'
], function (Controller, History, MessageToast, MessageBox, formatter) {
    "use strict";
    return Controller.extend("de.nak.minibar.controller.Detail", {
        //formatter Aufruf
        formatter: formatter,

        //initialisieren der Funktion _onObjectMatched mit getRoute
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched,
                this);
        },

        //Pfad vom angeklickten Produkt generieren und in der View setzen,
        //damit genau das eine Produkt angezeigt werden kann
        _onObjectMatched: function (oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            var oView = this.getView();
            var oContext = oView.getModel("minibar").createBindingContext("/" +
                oArgs.path);
            oView.setBindingContext(oContext, "minibar");
        },

        //zum Warenkorb navigieren
        onSCButtonPress: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("shoppingcart", {path:"SHOPPINGCARTSet"})
        },

        //Produkt zum Warenkorb hinzufügen
        //Wenn maximale Anzahl im Warenkorb überschritten wird, Fehler anzeigen
        //Nach hinzufügen zum Warenkorb, entscheiden ob zum Warenkorb navigieren oder nicht
        onAddToSCPress: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oI18N = this.getView().getModel("i18n").getResourceBundle();
            var oModel = this.getView().getModel("minibar");
            var oBindingContext = this.getView().getBindingContext("minibar");
            var oEntity = oBindingContext.getObject();
            var sAmount = this.getView().byId("inputAmount").getSelectedItem().getText();
            var that = this;
            var oItem = {
                Matnr: oEntity.Matnr,
                Amount: sAmount
            };
            var mParameters = {
                success: function () {
                    MessageBox.success(oI18N.getText("detail.ProductPlacedInSC"),{
                        initialFocus: null,
                        textDirection: sap.ui.core.TextDirection.Inherit,
                        onClose: function(sButton){
                            if (sButton === MessageBox.Action.OK){
                                MessageBox.show(oI18N.getText("detail.NavigateToSC"),{
                                    icon: sap.m.MessageBox.Icon.QUESTION,
                                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                                    initialFocus: null,
                                    textDirection: sap.ui.core.TextDirection.Inherit,
                                    onClose: function(sButton){
                                        if (sButton === MessageBox.Action.YES){
                                            oRouter.navTo("shoppingcart", {path:"SHOPPINGCARTSet"});
                                        }else if (sButton === MessageBox.Action.NO){
                                            that.onNavButtonPress();
                                        };
                                    }
                                });
                            };
                        }
                    });
                },
                error: function (oError) {
                    var sMessage = JSON.parse(oError.responseText).error.message.value;
                    MessageBox.error(sMessage);
                }
            };
            oModel.create("/SHOPPINGCARTSet", oItem , mParameters);
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
