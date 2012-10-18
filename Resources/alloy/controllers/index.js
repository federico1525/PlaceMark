function Controller() {
    function doLogin(e) {
        var winInput = Alloy.createController("input").getView("inputWindow");
        Cloud.Users.login({
            login: $.username.value,
            password: $.password.value
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                Ti.API.info("#### Logged in! You are now logged in as " + user.id);
                winInput.open();
            } else Ti.API.info("#### error " + JSON.stringify(e));
        });
    }
    function goToSignup() {
        var win = Alloy.createController("signup").getView("signupWindow");
        win.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.index = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    }), "Window", null);
    $.addTopLevelView($.__views.index);
    $.__views.content = A$(Ti.UI.createView({
        id: "content"
    }), "View", $.__views.index);
    $.__views.index.add($.__views.content);
    $.__views.logincnt = A$(Ti.UI.createView({
        id: "logincnt"
    }), "View", $.__views.content);
    $.__views.content.add($.__views.logincnt);
    $.__views.username = A$(Ti.UI.createTextField({
        top: 5,
        hintText: "Username",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        width: "80%",
        height: 30,
        id: "username"
    }), "TextField", $.__views.logincnt);
    $.__views.logincnt.add($.__views.username);
    $.__views.password = A$(Ti.UI.createTextField({
        top: 45,
        hintText: "Your password",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        width: "80%",
        height: 30,
        passwordMask: "true",
        id: "password"
    }), "TextField", $.__views.logincnt);
    $.__views.logincnt.add($.__views.password);
    $.__views.login = A$(Ti.UI.createButton({
        top: 100,
        width: 200,
        height: 50,
        color: "#336699",
        title: "Click to Login",
        id: "login"
    }), "Button", $.__views.content);
    $.__views.content.add($.__views.login);
    $.__views.signup = A$(Ti.UI.createButton({
        top: 180,
        width: 200,
        height: 50,
        color: "#336699",
        title: "Signup",
        id: "signup"
    }), "Button", $.__views.content);
    $.__views.content.add($.__views.signup);
    _.extend($, $.__views);
    var Cloud = require("ti.cloud"), Alloy = require("alloy");
    $.login.addEventListener("click", doLogin);
    $.index.open();
    $.signup.addEventListener("click", goToSignup);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;