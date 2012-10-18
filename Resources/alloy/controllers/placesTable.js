function Controller() {
    function goBack(e) {
        $.winTable.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.winTable = A$(Ti.UI.createWindow({
        backgroundColor: "black",
        id: "winTable",
        fullscreen: "false"
    }), "Window", null);
    $.addTopLevelView($.__views.winTable);
    $.__views.content = A$(Ti.UI.createView({
        id: "content"
    }), "View", $.__views.winTable);
    $.__views.winTable.add($.__views.content);
    $.__views.topView = A$(Ti.UI.createView({
        top: 0,
        height: 30,
        backgroundColor: "black",
        id: "topView"
    }), "View", $.__views.content);
    $.__views.content.add($.__views.topView);
    $.__views.back = A$(Ti.UI.createLabel({
        text: "Back",
        left: 10,
        color: "white",
        id: "back"
    }), "Label", $.__views.topView);
    $.__views.topView.add($.__views.back);
    var __alloyId1 = [];
    $.__views.table = A$(Ti.UI.createTableView({
        top: 30,
        bottom: 2,
        left: 2,
        right: 2,
        editable: !0,
        id: "table"
    }), "TableView", $.__views.content);
    $.__views.content.add($.__views.table);
    _.extend($, $.__views);
    var Cloud = require("ti.cloud"), NAVIBRIDGE = require("ti.navibridge");
    NAVIBRIDGE.SetApplicationID("ICiAV4Ay");
    $.back.addEventListener("click", goBack);
    var data = [];
    $.winTable.addEventListener("open", function() {
        Cloud.Places.query(function(e) {
            if (e.success) if (e.places.length == 0) $.table.setData([ {
                title: "No places marked!"
            } ]); else {
                for (var i = 0, l = e.places.length; i < l; i++) {
                    var label = Ti.UI.createLabel({
                        text: e.places[i].name + " -- " + e.places[i].address,
                        left: 5
                    }), tvr = Ti.UI.createTableViewRow({
                        height: 40,
                        id: e.places[i].id,
                        latitude: e.places[i].latitude,
                        longitude: e.places[i].longitude
                    });
                    tvr.add(label);
                    data.push(tvr);
                }
                $.table.setData(data);
            } else Ti.API.error("#### + PLaces.query error");
        });
    });
    $.table.addEventListener("click", function(evt) {
        if (evt.row.id) {
            Ti.API.info("#### " + evt.row.latitude + "  " + evt.row.longitude);
            NAVIBRIDGE.addPOI({
                lat: evt.row.latitude,
                lon: evt.row.longitude
            });
        }
    });
    $.table.addEventListener("delete", function(e) {
        Cloud.Places.remove({
            place_id: e.row.id
        }, function(evt) {
            evt.success || alert("Error:\\n" + (evt.error && evt.message || JSON.stringify(evt)));
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;