sap.ui.define([
    'sap/ui/core/format/NumberFormat'
], function (NumberFormat) {
    "use strict";

    var formatter = {
        /**
         * Formats the price
         * @param {string} sValue model price value
         * @return {string} formatted price
         */
        price: function (sValue) {
            var numberFormat = NumberFormat.getFloatInstance({
                maxFractionDigits: 2,
                minFractionDigits: 2,
                groupingEnabled: true,
                groupingSeparator: ".",
                decimalSeparator: ","
            });
            return numberFormat.format(sValue);
        },

        availableText: function (sValue) {
            var oI18N = this.getView().getModel("i18n").getResourceBundle();
            var sAvailable = oI18N.getText("products.Available");
            var sNotAvailable = oI18N.getText("products.NotAvailable");
            if (sValue === "X"){
                return sAvailable;
            }else {
                return sNotAvailable;
            };
        }
    };

    return formatter;
});