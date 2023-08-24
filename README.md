# Module-15-Leaflet-Challenge

I started by selecting the USGS API that included all earthquakes within the past 7 days, and stored the endpoint as a variable. Then, using Leaflet, created a tile layer, as well as the map object itself, then added the tile layer to the map object. Using a D3 get request, I loaded the data, and then began creating functions to visualize the data.

-----

Notes:

Instead of using if/else statements for the various colors to denote earthquake depth, I ended up using switch(true) (source: https://medium.com/trabe/using-switch-true-in-javascript-986e8ad8ae4f), as it seemed to make more sense. I also made use of Leaflet's documentation to create the legend for the map, as well as its corresponding CSS classes (sources: https://gis.stackexchange.com/questions/193161/add-legend-to-leaflet-map, https://www.igismap.com/legend-in-leafletjs-map-with-topojson/).