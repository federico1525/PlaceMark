var Cloud = require('ti.cloud');

var NAVIBRIDGE = require("ti.navibridge");
NAVIBRIDGE.SetApplicationID('ICiAV4Ay');

// definying Back top button
function goBack(e){
	$.winTable.close();
};
$.back.addEventListener('click', goBack);

// Populating the tableView with myPlaces stored on ACS
var data = [];


$.winTable.addEventListener('open', function () {
        Cloud.Places.query(function (e) {
            if (e.success) {
                if (e.places.length == 0) {
                    $.table.setData([
                        { title: 'No places marked!' }
                    ]);
                }
                else {
                    // var data = [];
                    // for (var i = 0, l = e.places.length; i < l; i++) {
                        // data.push(Ti.UI.createTableViewRow({
                            // title: e.places[i].name,
                            // id: e.places[i].id,
                            // latitude: e.places[i].latitude,
                            // longitude: e.places[i].longitude,
                        // }));
                    // }
                    
                    // or
                    for (var i = 0, l = e.places.length; i < l; i++) {
                    	
                    	var label = Ti.UI.createLabel({
                    		text: e.places[i].name + ' -- ' + e.places[i].address,
                    		left:5
                    	});
                    	var tvr = Ti.UI.createTableViewRow({
                            // title: e.places[i].name,
                            height:40,
                            name: e.places[i].name,
                            id: e.places[i].id,
                            latitude: e.places[i].latitude,
                            longitude: e.places[i].longitude,
                       });
                       tvr.add(label);
                       
                       data.push(tvr);
                    }
                    
                    $.table.setData(data);
                }
            }
            else {
            	Ti.API.error("#### + PLaces.query error");
            }
        });
    });
    
// Open the NaviBridge!
$.table.addEventListener('click', function (evt) {
        if (evt.row.id) {        	
        	// Ti.Platform.openURL('http://maps.google.com/?q='+evt.row.latitude+','+evt.row.longitude);
         	Ti.API.info('#### ' + evt.row.latitude + '  ' + evt.row.longitude)
 
        	NAVIBRIDGE.addPOI({ 
        		 title: evt.row.name,
    			 lat: evt.row.latitude, 
   				 lon: evt.row.longitude
				});
        }
    }); 
    
$.table.addEventListener('delete', function(e){
	Cloud.Places.remove({
    	place_id: e.row.id,
	}, function (evt) {
	    if (!evt.success) {
	        alert('Error:\\n' +
	            ((evt.error && evt.message) || JSON.stringify(evt)));
	};
});
});



