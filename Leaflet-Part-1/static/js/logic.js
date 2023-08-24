// Store API endpoint as url
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Create tile layer for map
var map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

// Create map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

// Add tile layer to map
map.addTo(myMap);

// Perform GET request to query url
d3.json(url).then(function(data) {

    // Create function for earthquake markers
    function markerInfo(feature) {
        return {
            fillOpacity: 1,
            opacity: 1,
            color: "white",
            weight: 0.1,
            fillColor: getColor(feature.geometry.coordinates[2]),
            radius: getRadius(feature.properties.mag)
        }
    }
    
    // Create function to get the color of the marker based on earthquake depth
    function getColor(earthquakeDepth) {
        switch (true) {
            case earthquakeDepth > 90:
                return "red";
            case earthquakeDepth > 70:
                return "darkorange";
            case earthquakeDepth > 50:
                return "orange";
            case earthquakeDepth > 30:
                return "yellow";
            case earthquakeDepth > 10:
                return "lightgreen";
            default:
                return "green";
        }
    }

    // Create function to get the size of the marker based on earthquake magnitude
    // First check magnitude is not equal to 0; if 0 set to 1
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 3
    }

    // Add GeoJson layer to map and create circular markers
    L.geoJson(data, {
        pointToLayer: function(feature, latlon) {
            return L.circleMarker(latlon);
        },
        style: markerInfo,
        
        // Create popups for each marker to display magnitude, location, and depth
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
                "Magnitude: " + feature.properties.mag + 
                "<br>Location: " + feature.properties.place +
                "<br>Depth " + feature.geometry.coordinates[2]
            );
        }
    }).addTo(myMap);

    // Create legend for map
    var legend = L.control({
        position: "bottomright"
    });

    // Add legend contents
    legend.onAdd = function(myMap) {
        var div = L.DomUtil.create("div", "info legend")
        var grades = [-10, 10, 30, 50, 70, 90]
        var colors = ["green", "lightgreen", "yellow", "orange", "darkorange", "red"];
        
        // Create for loop to go through each grade to get its colored square
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style="background: ' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
    ;}
    
    // Add legend to map
    legend.addTo(myMap);
});