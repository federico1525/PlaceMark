var Cloud = require('ti.cloud');
var Alloy = require("alloy");

function createUser(){
	
		var win = Alloy.createController('input').getView('inputWindow');
		
		Cloud.Users.create({
            username: $.username.value,
            password: $. password.value,
            password_confirmation: $.confirmPassword.value,
            // first_name: firstName.value,
            // last_name: lastName.value
        }, function (e) {
            if (e.success) {
                // var user = e.users[0];
                Ti.API.info('#### Created! You are now logged in as ' + JSON.stringify(e.user));
                // alert('Created! You are now logged in as ' + user.name);
                // $.username.value = $.password.value = $.confirmPassword.value = '';//firstName.value = lastName.value = '';
                
                win.open();
             }
            // }
            else {
                // error(e);
                alert('error creating new user: ' + JSON.stringify(e.message));
                // Ti.API.error('#### error creating new user' + JSON.stringify(e));
            }
        });

};
$.signup.addEventListener('click', createUser);


function goBack(e){
	$.signupWindow.close();
};
$.back.addEventListener('click', goBack);
