var Cloud = require('ti.cloud');

var lat, lon;

function getLocation(e) {

	Ti.Geolocation.locationServicesEnabled = true;
	Ti.Geolocation.purpose = 'Bookmark places!';
	
	Titanium.Geolocation.getCurrentPosition(function(e) {
		Ti.API.info('gettingCurrentPosition');
		if (!e.success || e.error) {
			currentLocation.text = 'error: ' + JSON.stringify(e.error);
			alert('error ' + JSON.stringify(e.error));
			return;
		}
		lon = e.coords.longitude;
		lat = e.coords.latitude;
	});
};

$.nameField.addEventListener('focus', function(){
	$.nameField.value = ''
});
$.descriptionField.addEventListener('focus', function(){
	$.descriptionField.value = ''
});



function markPlace(evt) {
	
	getLocation();
	
	var nameField = $.nameField.value;
	var addressField = $.descriptionField.value;

	$.nameField.blur();
	$.descriptionField.blur();

	Ti.API.info('#### ' + nameField + '  ' + addressField);
	
	if ($.nameField.value){
		addressField = addressField || ' ';
		(function submitForm() {
			Cloud.Places.create({
				name : nameField,
				address : addressField,
				latitude : lat.toString(),
                longitude : lon.toString(),
				// city: city.value,
				// state: state.value,
				// postal_code: postalCode.value
			}, function(e) {
				if (e.success) {
					alert('New Place added!');
					
				} else {
					Ti.API.error('#### error in the submitForm' + JSON.stringify(e) + lat + lon);
					Ti.API.error('#### ' + addressField)
				}
				// button.show();
			});
		})();
	}
	else {
		alert("Enter a name for your place!")
	}
};
$.button.addEventListener('click', markPlace);

function openPlacesTable() {
	var winTable = Alloy.createController('placesTable').getView('winTable');
	winTable.open();
}
$.openTable.addEventListener('click', openPlacesTable);


function logout() {
	Cloud.Users.logout(function (e) {
        if (e.success) {
            $.inputWindow.close();
            Ti.API.info("logged out!")
        }
        else {
            alert = (e.error && e.message) || e;
        }
    });
};

$.logout.addEventListener('click', logout);
