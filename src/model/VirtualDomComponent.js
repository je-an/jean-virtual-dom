define([
    "Failure",
    "TypeCheck",
    "VirtualDomElementType",
    "VirtualDomElementAttribute"
], function (
    Failure,
    TypeCheck,
    VirtualDomElementType,
    VirtualDomElementAttribute
) {
        /**
         * Virtual DOM implementation 
         * @alias VirtualDomComponent 
         * @constructor
         * @param {Object} options - options object
         */
        var VirtualDomComponent = function (options) {
            this.type = TypeCheck.isEnumValue(options.type, VirtualDomElementType) ? options.type : Failure.throwTypeError("options.type is not a value of VirtualDomElementType");
            this.attributes = TypeCheck.areObjectsInstanceOf(options.attributes, VirtualDomElementAttribute) || TypeCheck.isEmptyArray(options.attributes) ? options.attributes : Failure.throwTypeError("options.attributes contains objects which are not an instance of VirtualDomElementAttribute");
            this.domElement = null;
        };
        /** */
        return VirtualDomComponent;
    });