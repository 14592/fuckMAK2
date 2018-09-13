sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";
    return Controller.extend("de.nak.minibar.controller.Shoppingcart", {

         deleteSCItem: function (){

         },
        onOrderButtonPress: function (){
            var oModel = new sap.ui.model.odata.ODataModel('https://r41z.ucc.ovgu.de/sap/opu/odata/sap/ZVG_15D_54_MINIBAR_SRV_01/');

            oModel.callFunction("/checkoutCart", {

                method:"POST",

            });
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("main", {}, true);

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
