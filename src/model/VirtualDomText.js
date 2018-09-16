define([
    "TypeCheck",
    "Failure"
], function (
    TypeCheck,
    Failure
) {
        /**
         * Virtual DOM text node 
         * @alias VirtualDomText 
         * @constructor
         * @param {String|Number} value - text node value
         */
        var VirtualDomText = function (value) {
            this.value = TypeCheck.isString(value) || TypeCheck.isNumber(value) ? value : Failure.throwTypeError("value is not a string or a number");
        };
        /** */
        return VirtualDomText;
    });