sap.ui.define([
    'sap/ui/core/format/NumberFormat'
], function (NumberFormat) {
    "use strict";

    var formatter = {

        //formatiert den importierten String zum Preisformat
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

        //wenn importierter String "X" ist, dann wird der String "Verfügbar" zurückgegeben
        //wenn nicht dann "nicht Verfügbar"
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