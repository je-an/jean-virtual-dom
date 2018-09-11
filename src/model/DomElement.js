define([
    "TypeCheck",
    "Failure",
    "DomElementType",
    "DomElementAttribute"
], function (
    TypeCheck, 
    Failure,
    DomElementType,
    DomElementAttribute
) {
        /**
         * Virtual DOM implementation 
         * @alias DomElement 
         * @constructor
         * @param {Object} options - options object
         * @param {DomElementType} options.type - the type of the DomElement
         * @param {DomElementAttribute[]} options.attributes - the attributes of this DomElement
         * @param {DomElement[]} options.children - the child elements of this DomElement
         */
        var DomElement = function (options) {
            this.type = TypeCheck.isEnumValue(options.type, DomElementType) ? options.type : Failure.throwTypeError("options.type is not a value of DomElementType");
            this.attributes = TypeCheck.areObjectsInstanceOf(options.attributes, DomElementAttribute) ? options.attributes : Failure.throwTypeError("options.attributes contains objects which are not an instance of DomElementAttribute");
            this.children = TypeCheck.areObjectsInstanceOf(options.children, DomElement) ? options.children : Failure.throwTypeError("options.children contains objects which are not an instance of DomElement");
        };
        return DomElement;
    });