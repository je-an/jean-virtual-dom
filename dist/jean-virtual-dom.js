(function (root, factory) { 
 	 if (typeof define === 'function' && define.amd) { 
	 	 define([], factory); 
	} else { 
	 	root.VirtualDom = root.VirtualDom || {}; 
	 	root.VirtualDom = factory();
	}
}(this, function() {
var require, define;
(function (window) {
    var modules = { resolved: {}, unresolved: {} };
    function getResolvedModules(dependencies) {
        for (var i = 0, resolvedModules = []; i < dependencies.length; i++) {
            var resolvedModule = modules.resolved[dependencies[i]];
            if (resolvedModule) {
                resolvedModules.push(resolvedModule);
            }
        }
        return resolvedModules;
    }
    function checkUnresolved() {
        for (var id in modules.unresolved) {
            var module = modules.unresolved[id];
            var resolvedModules = getResolvedModules(module.dependencies);
            resolve(id, module.factory, module.dependencies, resolvedModules, false);
        }
    }
    function resolve(id, factory, dependencies, resolvedModules, saveUnresolved) {
        if (resolvedModules.length === dependencies.length) {
            modules.resolved[id] = factory.apply(factory, resolvedModules);
        } else if (saveUnresolved) {
            modules.unresolved[id] = {
                dependencies: dependencies,
                factory: factory
            }
        }
    }
    define = function (id, dependencies, factory) {
        if (modules.resolved[id]) {
            console.warn("There is already a module with id <" + id + "> defined. Therefore this module will be ignored");
            return;
        } else if ((typeof id !== "string") || (!Array.isArray(dependencies)) || (typeof factory !== "function")) {
            console.warn("Passed arguments for module are invalid");
            return;
        }
        if (dependencies.length === 0) {
            resolve(id, factory, dependencies, [], false);
        } else {
            resolve(id, factory, dependencies, getResolvedModules(dependencies), true);
        }
        checkUnresolved();
    };
    define.amd = {}; 
    require = function (dependencies, factory) {
        dependencies = Array.isArray(dependencies) ? dependencies : [dependencies];
        var resolvedModules = getResolvedModules(dependencies);
        if(resolvedModules.length === 1 && !factory){
            return resolvedModules[0];
        }
        if (resolvedModules.length === dependencies.length && factory) {
            factory.apply(factory, resolvedModules);
        } else {
            throw new Error("Not all modules are resolved");
        }
    };
})();
define("node_modules/jean-amd/dist/jean-amd", function(){});

define('Failure',[], function () {
    /**
     * Provides error throwing functionality 
     * @alias Failure 
     */
    return {
        /**
         * Throws an Error with the provided errorMessage
         * @throws {Error}
         * @param {String} [errorMessage=String.Empty] - Message which shall be displayed for this Error
         */
        throwError: function (errorMessage) {
            throw new Error(errorMessage);
        },
        /**
         * Throws an TypeError with the provided errorMessage
         * @throws {TypeError}
         * @param {String} [errorMessage=String.Empty] - Message which shall be displayed for this TypeError
         */
        throwTypeError: function (errorMessage) {
            throw new TypeError(errorMessage);
        }
    };
});
define('TypeCheck',[], function () {
    return {
        /**
         * Checks if provided element type is string
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is string, false otherwise
         */
        isString: function (o) {
            return (typeof o === "string") ? true : false;
        },
        /** 
         * Checks if provided element type is boolean
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is boolean, false otherwise
         */
        isBoolean: function (o) {
            return (typeof o === "boolean") ? true : false;
        },
        /**
         * Checks if provided element type is boolean
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is boolean, false otherwise
         */
        isNumber: function (o) {
            return (typeof o === "number") ? true : false;
        },
        /**
         * Checks if provided element is an object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isObject: function (o) {
            var isObject = false;
            if (this.isString(o) || this.isFunction(o)) {
                return false;
            }
            if (this.isEmptyObject(o)) {
                return true;
            }
            for (var k in o) {
                if (o.hasOwnProperty(k)) {
                    isObject = true;
                    break;
                }
            }
            return isObject;
        },
        /**
         * Checks if provided element is an empty object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isEmptyObject: function (o) {
            var isEmpty = true;
            if (!this.isDefined(o) || this.isBoolean(o) || this.isFunction(o) ||
                this.isNumber(o) || this.isString(o) || Array.isArray(o)) {
                return false;
            }
            for (var k in o) {
                if (o.hasOwnProperty(k)) {
                    isEmpty = false;
                    break;
                }
            }
            return isEmpty;
        },
        /**
        * Checks if provided element is a function
        * @public
        * @memberof TypeCheck
        * @param {Any} o - element to be checked
        * @returns {Boolean} True, if element is a function, false otherwise
        */
        isFunction: function (o) {
            return (typeof o === "function") ? true : false;
        },
        /**
         * Checks if provided element is defined
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is defined, false otherwise
         */
        isDefined: function (o) {
            return (o !== undefined && o != null);
        },
        /**
         * Checks if provided element is an array
         * @public 
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} - true if o is an array, false otherwise
         */
        isArray: function (o) {
            return Array.isArray(o);
        },
        /**
         * Check id provided element is an empty array
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} - True if o is an empty array, false otherwise
         */
        isEmptyArray: function (o) {
            return this.isArray(o) && (o.length === 0);
        },
        /**
         * Checks if all elements in this array have the same type
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If options.type is not a string
         * @throws {TypeError} - If options.array is not a string
         * @param {Any[]} array - Array to be checked
         * @param {String} type - Type of elements in this array. Valid values are all which matches 
         *                        to the typeof operator
         * @returns {Boolean} - true if all elements in the array have the same type, false otherwise
         */
        isArrayTypeOf: function (array, type) {
            var isTypeOf = true;
            if (!this.isString(type)) {
                throw new TypeError("options.type is not a string");
            }
            if (!Array.isArray(array)) {
                throw new TypeError("options.array is not an array");
            }
            if (array.length === 0) {
                isTypeOf = false;
            }
            for (var i = 0, length = array.length; i < length; i++) {
                var o = array[i];
                if (typeof o !== type) {
                    isTypeOf = false;
                    break;
                }
            }
            return isTypeOf;
        },
        /**
          * Checks if all objects within array have the same instance
          * @public
          * @memberof TypeCheck
          * @throws {TypeError} - If array is not an array
          * @throws {TypeError} - If constructor is not a function
          * @param {Object[]} array - The array which objects shall be checked
          * @param {Function} fn - the constructor function
          * @returns {Boolean} - True if all elements have the same instance, false otherwise
          */
        areObjectsInstanceOf: function (array, fn) {
            if (!this.isArray(array)) {
                throw new TypeError("array is not an array");
            }
            if (!this.isFunction(fn)) {
                throw new TypeError("fn is not a function");
            }
            var i, o, length = array.length, result = true;
            for (i = 0; i < length; i++) {
                o = array[i];
                if (!this.isObject(o) || !this.isInstanceOf(o, fn)) {
                    result = false;
                    break;
                }
            }
            return result;
        },
        /**
         * Checks if the objects have are instances of the provided constructors
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If array is not an array
         * @throws {TypeError} - If constructors is not an array
         * @param {Object[]} objects - The array which objects shall be checked
         * @param {Function[]} constructors - An array of constructor functions
         * @returns {Boolean} - True if all elements have the same instance, false otherwise
         */
        areObjectsInstancesOf: function (objects, constructors) {
            var i, j, o, length = objects.length, constructorLength = constructors.length, result = true, noConstructorMatched;
            if (!this.isArray(objects)) {
                throw new TypeError("objects is not an array");
            }
            if (!this.isArray(constructors)) {
                throw new TypeError("constructors is not an array");
            }
            if (!this.isArrayTypeOf(constructors, "function")) {
                throw new TypeError("constructors is not an array of constructor functions");
            }
            for (i = 0; i < length; i++) {
                o = objects[i];
                noConstructorMatched = true;
                for (j = 0; j < constructorLength; j++) {
                    if(!this.isObject(o)){
                        break;
                    }
                    if (this.isInstanceOf(o, constructors[j])) {
                        noConstructorMatched = false;
                        break;
                    }
                }
                if (noConstructorMatched === true) {
                    result = false;
                    break;
                }
            }
            return result;
        },
        /**
         * Checks if child is an instance of parent
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If child is not an object
         * @throws {TypeError} - If parent is not a function
         * @param {Object} child - The object which shall be checked
         * @param {Function} parent - The function which shall be the constructor
         * @returns {Boolean} - True if child is an instance of parent, false otherwise
         */
        isInstanceOf: function (child, parent) {
            if (!this.isObject(child)) {
                throw new TypeError("child is not an object");
            }
            if (!this.isFunction(parent)) {
                throw new TypeError("parent is not a function");
            }
            return child instanceof parent;
        },
        /**
         * Checks if the provided value is a value of the provided object which is used as an enum
         * @throws {TypeError} - If value is not a string or a number
         * @throws {TypeError} - If o is not an object
         * @param {String|Number} value - the value
         * @param {Object} o - the object which shall be checked
         * @returns {Boolean} - True if value is part of o, false otherwise
         */
        isEnumValue: function (value, o) {
            if (!this.isString(value) && !this.isNumber(value)) {
                throw new TypeError("value must be a String or a Number");
            }
            if (!this.isObject(o)) {
                throw new TypeError("o is not an object");
            }
            var keys = Object.keys(o), length = keys.length, i, isValue = false;
            for (i = 0; i < length; i++) {
                if (o[keys[i]] === value) {
                    isValue = true;
                    break;
                }
            }
            return isValue;
        }
    };
});
define('VirtualDomText',[
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
define('VirtualDomElementType',[], function () {
    return {
        DIV: "div",
        H1: "h1",
        P: "p"
    };
});
define('VirtualDomElementAttributeType',[], function () {
    return {
        ID: "id",
        CLASS: "class",
        STYLE: "style"
    };
});
define('VirtualDomElementAttribute',[
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
define('VirtualDomElement',[
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
define('src/VirtualDom',[ // jscs:ignore
    "Failure",
    "TypeCheck",
    "VirtualDomText",
    "VirtualDomElement",
    "VirtualDomElementType",
    "VirtualDomElementAttribute",
    "VirtualDomElementAttributeType"
], function (
    Failure,
    TypeCheck,
    VirtualDomText,
    VirtualDomElement,
    VirtualDomElementType,
    VirtualDomElementAttribute,    
    VirtualDomElementAttributeType
) {
        /**
         * Virtual DOM implementation 
         * @alias VirtualDom 
         */
        return {
            /**
             * @param {VirtualDomElementType} type - the type of the VirtualDomElement
             * @param {VirtualDomElementAttribute[]} attributes - the attributes of this VirtualDomElement
             * @param {DomElement[]} children - the child elements of this VirtualDomElement
             * @returns {VirtualDomElement} - The created vDom element
             */
            createElement: function (type, attributes, children) {
                return new VirtualDomElement({
                    type: type,
                    attributes: attributes,
                    children: children
                });
            },
            /**
             * @param {VirtualDomElementAttributeType} type - the type of the DomElementAttribute
             * @param {String[]} values - the values of the DomElementAttribute
             * @returns {VirtualDomElementAttribute} - the create vDom element attribute
             */
            createAttribute: function (type, values) {
                return new VirtualDomElementAttribute({
                    type: type,
                    values: values
                });
            },
            /**
             * @param {String} value - the value of the vDom text
             * @returns {VirtualDomText} - the create vDom text 
             */
            createText: function (value) {
                return new VirtualDomText(value);
            },
            /**
             * @param {VirtualDomElement|VirtualDomText} input - the vDOM element which shall be mounted
             * @param {HTMLElement} parentDomNode - the parent DOM node to which the vDOM shall be mounted
             */
            mount: function (input, parentDomNode) {
                if (TypeCheck.isInstanceOf(input, VirtualDomElement)) {
                    this._mountVirtualDomElement(input, parentDomNode)
                } else if (TypeCheck.isInstanceOf(input, VirtualDomText)) {
                    this._mountVirtualDomText(input, parentDomNode);
                } else {
                    Failure.throwError("input is not an instance of VirtualDomElement or VirtualDomText");
                }
            },
            /**
             * @param {VirtualDomElement} virtualDomElement - the vDOM element which shall be mounted
             * @param {HTMLElement} parentDomNode - the parent DOM node to which the vDOM shall be mounted
             */
            _mountVirtualDomElement: function (virtualDomElement, parentDomNode) {
                var attribute, attributes = virtualDomElement.attributes, attributesLength = attributes.length,
                    child, children = virtualDomElement.children, childrenLength = children.length, domElement,
                    i;
                // Create the DOM element from the vDOM element type
                domElement = virtualDomElement.domElement = document.createElement(virtualDomElement.type);
                // Add all attributes to the DOM element from vDOM element attributes
                for (i = 0; i < attributesLength; i++) {
                    attribute = attributes[i];
                    domElement.setAttribute(attribute.type, attributes.length > 1 ? attribute.values.join(" ") : attribute.values[0]);
                }
                // Add all attributes to the DOM element from vDOM element attributes
                for (i = 0; i < childrenLength; i++) {
                    child = children[i];
                    this.mount(child, domElement);
                }
                parentDomNode.appendChild(domElement);
            },
            /**
             * @param {VirtualDomText} virtualDomText - the vDOM text element which shall be mounted
             * @param {HTMLElement} parentDomNode - the parent DOM node to which the vDOM shall be mounted
             */
            _mountVirtualDomText: function (virtualDomText, parentDomNode) {
                parentDomNode.textContent = virtualDomText.value;
            },
            Text: VirtualDomText,
            Element: VirtualDomElement,
            ElementType: VirtualDomElementType,
            ElementAttribute: VirtualDomElementAttribute,
            ElementAttributeType: VirtualDomElementAttributeType
        };
    });

 	 return require('src/VirtualDom'); 
}));
