/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2013 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

/* ==========================================================================================
 * ExtJS-based validators (Classic UI)
 * ==========================================================================================
 */
jQuery(function ($) {

    /*
     * Prices
     */
    CQ.Ext.form.VTypes.price = function(value, field) {
        return value.length == 0 || !isNaN(parseFloat(value));
    };

    CQ.Ext.form.VTypes.priceText = CQ.I18n.getMessage("Must be a valid price.");
    CQ.Ext.form.VTypes.priceMask = /[\d\.]/;

    /*
     * Geometrixx-Outdoors SKUs
     */
    CQ.Ext.form.VTypes.sku = function(value, field) {
        return value.length == 0 || value.length >= 6;
    };

    CQ.Ext.form.VTypes.skuText = CQ.I18n.getMessage("Geometrixx Outdoors SKUs must be at least 6 characters.");

});


/* ==========================================================================================
 * jQuery-based validators (Touch-optimized UI)
 * ==========================================================================================
 */
(function(document, $, Granite) {
    "use strict";

    /*
     * Prices
     */

    if($.validator)    {
        $.validator.register({
            selector: "form [data-validation='geometrixx.price']",
            validate: function(el) {
                var v = el.val();

                if (v.length > 0 && (!v.match(/^[\d\.]+$/) || isNaN(parseFloat(v)))) {
                    return Granite.I18n.get("Must be a valid price.");
                }
            }
        });

        /*
         * Geometrixx-Outdoors SKUs
         */
        $.validator.register({
            selector: "form [data-validation='geometrixx.sku']",
            validate: function(el) {
                var v = el.val();

                if (v.length < 6) {
                    return Granite.I18n.get("Geometrixx Outdoors SKUs must be at least 6 characters.");
                }
            }
        });
    }
})(document, Granite.$, Granite);
