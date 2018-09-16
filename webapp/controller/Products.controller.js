sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], function (Controller, History, Filter, FilterOperator) {
    "use strict";
    return Controller.extend("de.nak.minibar.controller.Products", {

        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("products").attachPatternMatched(this._onObjectMatched,
                this);
        },

        onItemPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("detail", {
                path: oItem.getBindingContext("minibar").getPath().substr(1)
            });
        },

        _onObjectMatched: function (oEvent) {

            var oView = this.getView();
            var oTable = oView.byId("TableProducts");
            //var mParams = oEvent.getParameters();
            var oBinding = oTable.getBinding("items");

            var oArgs = oEvent.getParameter("arguments");
            var sPath = oArgs.path;
            var sCategory = sPath.match(/(?=\d).*(?=')/);


            oBinding.filter(new sap.ui.model.Filter("Category", sap.ui.model.FilterOperator.EQ, sCategory));


            // var aFilters = [];
            // for (var i = 0, l = mParams.filterItems.length; i < l; i++) {
            //     var oItem = mParams.filterItems[i];
            //     var aSplit = oItem.getKey().split("___");
            //     var sPath = aSplit[0];
            //     var vOperator = aSplit[1];
            //     var vValue1 = aSplit[2];
            //     var vValue2 = aSplit[3];
            //     var oFilter = new sap.ui.model.Filter(sPath, vOperator, vValue1, vValue2);
            //     aFilters.push(oFilter);
            // }
            // oBinding.filter(aFilters);
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
