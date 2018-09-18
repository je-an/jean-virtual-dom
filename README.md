## Description

Virtual DOM implementation -> Work in progress

## Support
Supports AMD eco system. If there is no loader, VirtualDom is registered as a browser variable.

## Code Example
- Use it as browser variable
```js
var AttributeType = VirtualDom.ElementAttributeType,
    ElementType = VirtualDom.ElementType;

const myApp = VirtualDom.createElement(VirtualDom.ElementType.DIV,
        [
            VirtualDom.createAttribute(AttributeType.ID, ["v-dom"]),
            VirtualDom.createAttribute(AttributeType.CLASS, ["first", "second", "third"]),
            VirtualDom.createAttribute(AttributeType.STYLE, ["background: red;", "height: 100px;", "width: 100px;"]),
        ],
        [
            VirtualDom.createElement(ElementType.H1, [VirtualDom.createAttribute(AttributeType.CLASS, ["my-header"])], [
                VirtualDom.createText("Header")
            ]),
            VirtualDom.createElement(ElementType.P, [VirtualDom.createAttribute(AttributeType.CLASS, ["my-paragraph"])], [
                VirtualDom.createText("iam an awesome text")
            ])
        ]
    );
    //mount in DOM
    VirtualDom.mount(myApp, document.getElementById("v-dom-container"));
```
- Use it with require.js
```js
require(["path/to/VirtualDom"], function(VirtualDom){
    // Work with VirtualDom
});
```

## Installation

`npm install jean-virtual-dom --save --legacy-bundling`

## API Reference

### VirtualDom.createElement(type, attributes, children) 

**Parameters**
 - **type**: `VirtualDomElementType` - the type of the VirtualDomElement
 - **attributes**: `VirtualDomElementAttribute[]` - the attributes of this VirtualDomElement
 - **children**: `VirtualDomElement[]` - the child elements of this VirtualDomElement

**Returns**
- `VirtualDomElement` - The created vDOM element

### VirtualDom.createAttribute(type, values) 

**Parameters**
 - **type**: `VirtualDomElementAttributeType` - the type of the VirtualDomElementAttribute
 - **values**: `String[]` - the values of the VirtualDomElementAttribute

**Returns**
- `VirtualDomElementAttribute` - the create vDOM element attribute

### VirtualDom.createText(value) 

**Parameters**
 - **value**: `String` - the value of the vDOM text

**Returns**
- `VirtualDomText` - the create vDOM text

### VirtualDom.mount(input, parentDomNode) 

**Parameters**
 - **input**: `VirtualDomElement|VirtualDomText` - the vDOM element which shall be mounted
 - **parentDomNode**: `HTMLElement` - the parent DOM node to which the vDOM shall be mounted


## Tests

- Open spec/spec-runner.html in browser to see the test cases.
- Host example/index.html in browser to see a test implementation.

## License

MIT