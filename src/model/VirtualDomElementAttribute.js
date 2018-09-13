define([
    "TypeCheck",
    "Failure",
    "VirtualDomElementAttributeType"
], function (
    TypeCheck, 
    Failure,
    VirtualDomElementAttributeType
) {
        /**
         * Virtual DOM implementation 
         * @alias VirtualDomElementAttribute 
         * @constructor
         * @param {Object} options - options object
         * @param {VirtualDomElementAttributeType} options.type - the type of the DomElementAttribute
         * @param {String[]} options.values - the values of the DomElementAttribute
         */
        var VirtualDomElementAttribute = function (options) {
            this.type = TypeCheck.isEnumValue(options.type, VirtualDomElementAttributeType) ? options.type : Failure.throwTypeError("options.type is not a value of VirtualDomElementAttributeType");
            this.values = TypeCheck.isArrayTypeOf(options.values, "string") ? options.values : Failure.throwTypeError("options.values contains values which are not type of string");
        };
        return VirtualDomElementAttribute;
    });