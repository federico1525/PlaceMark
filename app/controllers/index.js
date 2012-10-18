var Cloud = require("ti.cloud");
var Alloy = require("alloy");

function doLogin(e) {
	var winInput = Alloy.createController('input').getView('inputWindow');

	Cloud.Users.login({
		login: $.username.value,
		password: $.password.value,
		// login : $.username.value,
		// password : $.password.value,
	}, function(e) {
		if (e.success) {
			var user = e.users[0];
			// login.value = password.value = '';
			// alert('Logged in! You are now logged in as ' + user.id);
			Ti.API.info('#### Logged in! You are now logged in as ' + user.id);

			winInput.open();

		} else {
			Ti.API.info('#### error ' + JSON.stringify(e));
			
		}
	});

};

$.login.addEventListener('click', doLogin);

$.index.open();


function goToSignup(){
	var win = Alloy.createController('signup').getView('signupWindow');
	win.open();
};
$.signup.addEventListener('click', goToSignup);

