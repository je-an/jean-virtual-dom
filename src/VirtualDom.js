define([ // jscs:ignore
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
             * @param {String[]} values - the values of the vDom text
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