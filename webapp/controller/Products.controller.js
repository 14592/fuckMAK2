sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, History, Filter, FilterOperator) {
    "use strict";
    return Controller.extend("de.nak.minibar.controller.Products", {

        onItemPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("detail", {
                path: oItem.getBindingContext("minibar").getPath().substr(1)
            });
        },

        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("products").attachPatternMatched(this._onObjectMatched,
                this);
        },
        _onObjectMatched: function (oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            var path = oArgs.path;
            var result = path.match(/(?=\d).*(?=')/);

            //var oList = this.getView().byId("productList");
            // var oBinding = oList.getBinding("items");
            //var aFilter = [];
            //aFilter.push(new Filter('Category', FilterOperator.Equals, result));

            var oView = this.getView();
            var oContext = oView.getModel("minibar").createBindingContext("/" +
                oArgs.path);
            oView.setBindingContext(oContext, "minibar");


            //oBinding.filter(aFilter);
        },

        onFilter : function(oEvent) {
            var sQuery = oEvent.getParameter('query');
            var oList = this.getView().byId("productList");
            var oBinding = oList.getBinding("items");

            if (sQuery) {
                var aFilter = []
                aFilter.push(new Filter("Category", FilterOperator.Contains, sQuery));
                oBinding.filter(aFilter);
                alert(oBinding.getLength());
            } else {
                oBinding.filter([]);
            }
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
        },
        onSCButtonPress: function (evt) {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("shoppingcart", {path:"SHOPPINGCARTSet"})
    }
    })
});
