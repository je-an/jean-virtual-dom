({
    baseUrl: '.',
    out: 'dist/jean-virtual-dom.js',
    optimize: 'none',
    name: 'node_modules/jean-amd/dist/jean-amd',
    include: ["src/VirtualDom"],
    wrap: {
        start:
            "(function (root, factory) { \n" +
            " \t if (typeof define === 'function' && define.amd) { \n" +
            "\t \t define([], factory); \n" +
            "\t} else { \n" +
            "\t \troot.VirtualDom = root.VirtualDom || {}; \n" +
            "\t \troot.VirtualDom = factory();\n" +
            "\t}\n" +
            "}(this, function() {",
        end:
            "\n \t return require('src/VirtualDom'); \n" +
            "}));"
    },
    paths: {
        "TypeCheck": "node_modules/jean-type-check/src/TypeCheck",
        "Failure": "node_modules/jean-failure/src/Failure",
        "VirtualDomElementAttributeType": "src/enum/VirtualDomElementAttributeType",
        "VirtualDomElementType": "src/enum/VirtualDomElementType",
        "VirtualDomElement": "src/model/VirtualDomElement",
        "VirtualDomElementAttribute": "src/model/VirtualDomElementAttribute",
    }
})