define([ // jscs:ignore
    "VirtualDomElement",
    "VirtualDomElementAttribute",
    "VirtualDomElementType",
    "VirtualDomElementAttributeType"
], function (
    VirtualDomElement,
    VirtualDomElementAttribute,
    VirtualDomElementType,
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
             * @returns {VirtualDomElement} - The created vDom
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
             */
            createAttribute: function (type, values) {
                return new VirtualDomElementAttribute({
                    type: type,
                    values: values
                });
            },
            /**
             * @param {VirtualDomElement} virtualDomElement - the vDOM element which shall be mounted
             * @param {HTMLElement} parentDomNode - the parent DOM node to which the vDOM shall be mounted
             */
            mount: function (virtualDomElement, parentDomNode) {
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
            ElementType: VirtualDomElementType,
            ElementAttributeType: VirtualDomElementAttributeType,
            ElementAttribute: VirtualDomElementAttribute,
            Element: VirtualDomElement,
        };
    });