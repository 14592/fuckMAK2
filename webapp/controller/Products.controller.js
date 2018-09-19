sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    '../model/formatter'
], function (Controller, History, formatter) {
    "use strict";
    return Controller.extend("de.nak.minibar.controller.Products", {

        formatter: formatter,

        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("products").attachPatternMatched(this._onObjectMatched,
                this);
        },

        _onObjectMatched: function (oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            var oView = this.getView();
            var oContext = oView.getModel("minibar").createBindingContext("/" +
                oArgs.path);
            oView.setBindingContext(oContext, "minibar", {expand: 'CategoryToProductsNav'});
        },


        onSCButtonPress: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("shoppingcart", {path:"SHOPPINGCARTSet"})
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
