function Controller() {
    function createUser() {
        var win = Alloy.createController("input").getView("inputWindow");
        Cloud.Users.create({
            username: $.username.value,
            password: $.password.value,
            password_confirmation: $.confirmPassword.value
        }, function(e) {
            if (e.success) {
                Ti.API.info("#### Created! You are now logged in as " + JSON.stringify(e.user));
                win.open();
            } else alert("error creating new user: " + JSON.stringify(e.message));
        });
    }
    function goBack(e) {
        $.signupWindow.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.signupWindow = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        id: "signupWindow",
        fullscreen: "false"
    }), "Window", null);
    $.addTopLevelView($.__views.signupWindow);
    $.__views.content = A$(Ti.UI.createView({
        id: "content"
    }), "View", $.__views.signupWindow);
    $.__views.signupWindow.add($.__views.content);
    $.__views.signupForm = A$(Ti.UI.createView({
        id: "signupForm"
    }), "View", $.__views.content);
    $.__views.content.add($.__views.signupForm);
    $.__views.username = A$(Ti.UI.createTextField({
        top: 5,
        hintText: "Username",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        width: "80%",
        height: 30,
        id: "username"
    }), "TextField", $.__views.signupForm);
    $.__views.signupForm.add($.__views.username);
    $.__views.password = A$(Ti.UI.createTextField({
        top: 45,
        hintText: "Your password",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        width: "80%",
        height: 30,
        passwordMask: !0,
        id: "password"
    }), "TextField", $.__views.signupForm);
    $.__views.signupForm.add($.__views.password);
    $.__views.confirmPassword = A$(Ti.UI.createTextField({
        top: 85,
        hintText: "Confirm your password",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        width: "80%",
        height: 30,
        passwordMask: !0,
        id: "confirmPassword"
    }), "TextField", $.__views.signupForm);
    $.__views.signupForm.add($.__views.confirmPassword);
    $.__views.signup = A$(Ti.UI.createButton({
        top: 140,
        width: 200,
        height: 50,
        title: "Signup",
        id: "signup"
    }), "Button", $.__views.content);
    $.__views.content.add($.__views.signup);
    $.__views.back = A$(Ti.UI.createButton({
        top: 200,
        width: 200,
        height: 50,
        title: "Back to Login",
        id: "back"
    }), "Button", $.__views.content);
    $.__views.content.add($.__views.back);
    _.extend($, $.__views);
    var Cloud = require("ti.cloud"), Alloy = require("alloy");
    $.signup.addEventListener("click", createUser);
    $.back.addEventListener("click", goBack);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;