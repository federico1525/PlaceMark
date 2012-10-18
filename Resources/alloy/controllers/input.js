function Controller() {
    function markPlace(evt) {
        var nameField = $.nameField.value, addressField = $.descriptionField.value;
        $.nameField.blur();
        $.descriptionField.blur();
        Ti.API.info("#### " + nameField + "  " + addressField);
        if ($.nameField.value) {
            addressField = addressField || "";
            (function submitForm() {
                Cloud.Places.create({
                    name: nameField,
                    address: addressField,
                    latitude: lat,
                    longitude: -120
                }, function(e) {
                    if (e.success) alert("New Place added!"); else {
                        Ti.API.error("#### error in the submitForm" + JSON.stringify(e) + lat + lon);
                        Ti.API.error("#### " + addressField);
                    }
                });
            })();
        } else alert("Enter a name for your place!");
    }
    function openPlacesTable() {
        var winTable = Alloy.createController("placesTable").getView("winTable");
        winTable.open();
    }
    function logout() {
        Cloud.Users.logout(function(e) {
            if (e.success) {
                $.inputWindow.close();
                Ti.API.info("logged out!");
            } else alert = e.error && e.message || e;
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.inputWindow = A$(Ti.UI.createWindow({
        fullscreen: "false",
        title: "input window",
        top: 2,
        right: 2,
        left: 2,
        bottom: 2,
        backgroundColor: "white",
        id: "inputWindow"
    }), "Window", null);
    $.addTopLevelView($.__views.inputWindow);
    $.__views.content = A$(Ti.UI.createView({
        id: "content"
    }), "View", $.__views.inputWindow);
    $.__views.inputWindow.add($.__views.content);
    $.__views.inputForm = A$(Ti.UI.createView({
        id: "inputForm"
    }), "View", $.__views.content);
    $.__views.content.add($.__views.inputForm);
    $.__views.nameField = A$(Ti.UI.createTextField({
        top: 10,
        hintText: "Enter your place name!",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        width: "80%",
        height: 60,
        id: "nameField"
    }), "TextField", $.__views.inputForm);
    $.__views.inputForm.add($.__views.nameField);
    $.__views.descriptionField = A$(Ti.UI.createTextField({
        top: 80,
        hintText: "Specify the category here",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        width: "80%",
        height: 60,
        id: "descriptionField"
    }), "TextField", $.__views.inputForm);
    $.__views.inputForm.add($.__views.descriptionField);
    $.__views.button = A$(Ti.UI.createButton({
        top: 150,
        width: 200,
        height: 50,
        title: "Mark your Place!",
        id: "button"
    }), "Button", $.__views.inputForm);
    $.__views.inputForm.add($.__views.button);
    $.__views.openTable = A$(Ti.UI.createButton({
        top: 330,
        width: 200,
        height: 50,
        title: "My Places",
        id: "openTable"
    }), "Button", $.__views.inputForm);
    $.__views.inputForm.add($.__views.openTable);
    $.__views.logout = A$(Ti.UI.createButton({
        top: 400,
        width: 200,
        height: 50,
        title: "Logout",
        id: "logout"
    }), "Button", $.__views.inputForm);
    $.__views.inputForm.add($.__views.logout);
    _.extend($, $.__views);
    var Cloud = require("ti.cloud"), lat, lon;
    (function getLocation(e) {
        Ti.Geolocation.locationServicesEnabled = !0;
        Ti.Geolocation.purpose = "Bookmark places!";
        Titanium.Geolocation.getCurrentPosition(function(e) {
            Ti.API.info("gettingCurrentPosition");
            if (!e.success || e.error) {
                currentLocation.text = "error: " + JSON.stringify(e.error);
                alert("error " + JSON.stringify(e.error));
                return;
            }
            lon = e.coords.longitude;
            lat = e.coords.latitude;
        });
    })();
    $.nameField.addEventListener("focus", function() {
        $.nameField.value = "";
    });
    $.descriptionField.addEventListener("focus", function() {
        $.descriptionField.value = "";
    });
    $.button.addEventListener("click", markPlace);
    $.openTable.addEventListener("click", openPlacesTable);
    $.logout.addEventListener("click", logout);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;