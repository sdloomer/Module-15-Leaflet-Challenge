// Store API endpoint as url
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

let map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

// Create map object
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

map.addTo(myMap);

// Perform GET request to query url
d3.json(url).then(function(data) {
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

    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 3
    }

    L.geoJson(data, {
        pointToLayer: function(feature, latlon) {
            return L.circleMarker(latlon);
        },
        style: markerInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
                "Magnitude: " + feature.properties.mag + 
                "<br>Location: " + feature.properties.place
            );
        }
    }).addTo(myMap);

    var legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function(myMap) {
        var div = L.DomUtil.create("div", "info legend")
        var grades = [-10, 10, 30, 50, 70, 90]
        var colors = ["green", "lightgreen", "yellow", "orange", "darkorange", "red"];
    
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style="background: ' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
    ;}
    
    legend.addTo(myMap);
});

// function createFeatures(earthquakesData) {
//     function onEachFeature(feature, layer) {
//         layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//     };

//     let earthquakes = L.geoJSON(earthquakesData, {
//         onEachFeature: onEachFeature
//     });
//     createMap(earthquakes)
// }
// function createMap(earthquakes) {

//   // Create base layer
//     let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     })

//     let baseMaps = {
//         "Street Map": street
//     };

//     let overlayMaps = {
//         Earthquakes: earthquakes
//     };

//     let myMap = L.map("map", {
//         center: [
//             37.09, -95.71
//           ],
//           zoom: 5,
//           layers: [street, earthquakes]
//     });
   
//     L.control.layers(baseMaps, overlayMaps, {
//         collapsed: true
//     }).addTo(myMap);
// }

// let myMap = L.map("map", {
//     center: [37.09, -95.71],
//     zoom: 5
//   });

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);

// for (let i = 0; i < features.length; i++) {
//     let color = "";
//     if (features[i].geometry.coordinates[2] > )
// }