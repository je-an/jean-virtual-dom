## Description

Virtual DOM implementation -> Work in progress

## Support
Supports both CommonJS and AMD eco system. If there is no loader, VirtualDom is registered as a browser variable.

## Code Example
- Use it as browser variable
```js
var obj = new VirtualDom();
```
- Use it with require.js
```js
require(["path/to/VirtualDom"], function(VirtualDom){
    // Work with VirtualDom
});
```
- Use it with node.js
```js
var VirtualDom = require("jean-virtual-dom");
```
## Installation

`npm install jean-virtual-dom --save --legacy-bundling`

## API Reference

TBD

## Tests

- Open spec/spec-runner.html in browser to see the test cases.

## License

MIT