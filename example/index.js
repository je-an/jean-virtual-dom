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
    var AttributeType = VirtualDom.ElementAttributeType;
    Performance.startMeasurement();
    const myApp = VirtualDom.createElement(VirtualDom.ElementType.DIV,
        [
            VirtualDom.createAttribute(AttributeType.ID, ["container"]),
            VirtualDom.createAttribute(AttributeType.CLASS, ["first", "second", "third"])
        ],
        [
            VirtualDom.createElement(VirtualDom.ElementType.H1, [VirtualDom.createAttribute(AttributeType.CLASS, ["my-header"])], []),
            VirtualDom.createElement(VirtualDom.ElementType.P, [VirtualDom.createAttribute(AttributeType.CLASS, ["my-paragraph"])], [])
            ]
            );
    //mount in DOM
    VirtualDom.mount(myApp, document.body);
    Performance.stopMeasurement();
});