define([
    "TypeCheck",
    "Failure",
    "DomElementAttributeType"
], function (
    TypeCheck, 
    Failure,
    DomElementAttributeType
) {
        /**
         * Virtual DOM implementation 
         * @alias DomElementAttribute 
         * @constructor
         * @param {Object} options - options object
         * @param {DomElementAttributeType} options.type - the type of the DomElementAttribute
         * @param {String[]} options.values - the values of the DomElementAttribute
         */
        var DomElementAttribute = function (options) {
            this.type = TypeCheck.isEnumValue(options.type, DomElementAttributeType) ? options.type : Failure.throwTypeError("options.type is not a value of DomElementAttributeType");
            this.values = TypeCheck.areArrayTypeOf(options.values, "string") ? options.values : Failure.throwTypeError("options.values contains values which are not type of string");
        };
        return DomElementAttribute;
    });