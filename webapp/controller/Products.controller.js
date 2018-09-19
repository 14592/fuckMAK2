sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    '../model/formatter'
], function (Controller, History, formatter) {
    "use strict";
    return Controller.extend("de.nak.minibar.controller.Products", {
        //formatter Aufruf
        formatter: formatter,

        //initialisieren der Funktion _onObjectMatched
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("products").attachPatternMatched(this._onObjectMatched,
                this);
        },

        //alle Produkte der ausgewählten Kategorie anzeigen
        _onObjectMatched: function (oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            var oView = this.getView();
            var oContext = oView.getModel("minibar").createBindingContext("/" +
                oArgs.path);
            oView.setBindingContext(oContext, "minibar", {expand: 'CategoryToProductsNav'});
        },

        //zum Warenkorb navigieren
        onSCButtonPress: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("shoppingcart", {path:"SHOPPINGCARTSet"})
        },

        //ausgewähltes Produkt bestimmen und im Pfad mitgeben
        //zur Detailseite navigieren
        onItemPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("detail", {
                path: oItem.getBindingContext("minibar").getPath().substr(1)
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
