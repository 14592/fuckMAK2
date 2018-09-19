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
        }
    };

    return formatter;
});