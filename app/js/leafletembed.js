var map = L.map('map');

map.setView([51.2, 7], 9);


var whiteAndBlack =
        L.tileLayer('//{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            subdomains: 'abcd',
            maxZoom: 20,
            minZoom: 0,
            label: 'White and Black'  // optional label used for tooltip
        }),
    osm =
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            label: 'Street Map',
            maxZoom: 18,
            attribution: 'Map data &copy; OpenStreetMap contributors'
        }).addTo(map);


var lyr = L.tileLayer('./{z}/{x}/{y}.png', {tms: true, opacity: 0.7, attribution: ""});

var baseMaps = {
    'Street Map': osm,
    'White and Black': whiteAndBlack
};

var overlaymaps = {
    "Layer": lyr
}

L.control.layers(baseMaps, overlaymaps).addTo(map);


var sidebar = L.control.sidebar('sidebar').addTo(map);

// FeatureGroup is to store editable layers
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    draw: {
        polyline: false,
        polygon: false,
        marker: false,
        circle: false,
        circlemarker: false,
    },
    edit: {
        featureGroup: drawnItems
    }
});

//add event handlers for drawing on Map and save coordinates into an array

var recCoord;
map.on(L.Draw.Event.CREATED, function (e) {

    drawnItems.clearLayers();

    var type = e.layerType;
    var layer = e.layer
    console.log(layer);

    drawnItems.addLayer(layer);
    if (type === 'rectangle') {
    recCoord = JSON.stringify(layer._latlngs[0]);
        recCoord = recCoord.replace(/{"lat":/g, '');
        recCoord = recCoord.replace(/"lng":/g, '');
        recCoord = recCoord.replace(/}/g, '');

   }
   document.getElementById("coords").value = recCoord;

    console.log(recCoord)

});


map.addControl(drawControl);

var toolbar = L.Toolbar(); //was ist das hier für eine Toolbar??
toolbar.addToolbar(map);

var modifiedDraw = L.drawLocal.extend({
    draw: {
        toolbar: {
            buttons: {
                rectangle: 'Draw a recangle on the map'
            }
        }
    }
});

map.addControl(drawControl);
