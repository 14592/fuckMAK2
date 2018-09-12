sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";
    return Controller.extend("de.nak.minibar.controller.Shoppingcart", {

         deleteSCItem: function (){

         },
        //  onInit: function () {
        //      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        //      oRouter.getRoute("shoppingcart").attachPatternMatched(this._onObjectMatched,
        //          this);
        //  },
        // _onObjectMatched: function (oEvent) {
        //     var oArgs = oEvent.getParameter("arguments");
        //     var oView = this.getView();
        //     var oContext = oView.getModel("minibar").createBindingContext("/" +
        //         oArgs.path);
        //     oView.setBindingContext(oContext, "minibar");
        // },
        //
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
