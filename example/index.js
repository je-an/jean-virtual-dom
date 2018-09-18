// jscs:disable
// jshint ignore:start
$(document).ready(function () {
    var n = new Navbar({
        containerId: "jean-navbar-container",
        title: "Virtual DOM",
        icon: "favicon.ico",
        sections: [""],
        onSectionClick: function (id) {

        }
    });
    n.create();
    var AttributeType = VirtualDom.ElementAttributeType,
        ElementType = VirtualDom.ElementType;

    Performance.startMeasurement();
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
    Performance.stopMeasurement();
});

var array = new Uint8Array(128);
window.crypto.getRandomValues(array);

console.log("Your lucky numbers:");
for (var i = 0; i < array.length; i++) {
    console.log(array[i]);
}