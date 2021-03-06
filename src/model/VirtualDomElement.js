define([
    "Failure",
    "TypeCheck",
    "VirtualDomText",
    "VirtualDomElementType",
    "VirtualDomElementAttribute"
], function (
    Failure,
    TypeCheck,
    VirtualDomText,
    VirtualDomElementType,
    VirtualDomElementAttribute
) {
        /**
         * Virtual DOM implementation 
         * @alias DomElement 
         * @constructor
         * @param {Object} options - options object
         * @param {VirtualDomElementType} options.type - the type of the VirtualDomElement
         * @param {VirtualDomElementAttribute[]} options.attributes - the attributes of this VirtualDomElement
         * @param {Array<VirtualDomElement|VirtualDomText>} options.children - the child elements of this VirtualDomElement
         */
        var VirtualDomElement = function (options) {
            this.type = TypeCheck.isEnumValue(options.type, VirtualDomElementType) ? options.type : Failure.throwTypeError("options.type is not a value of VirtualDomElementType");
            this.attributes = TypeCheck.areObjectsInstanceOf(options.attributes, VirtualDomElementAttribute) || TypeCheck.isEmptyArray(options.attributes) ? options.attributes : Failure.throwTypeError("options.attributes contains objects which are not an instance of VirtualDomElementAttribute");
            this.children = TypeCheck.areObjectsInstancesOf(options.children, [VirtualDomElement, VirtualDomText]) || TypeCheck.isEmptyArray(options.children) ? options.children : Failure.throwTypeError("options.children contains objects which are not an instance of VirtualDomElement");
            this.domElement = null;
        };
        /** */
        return VirtualDomElement;
    });