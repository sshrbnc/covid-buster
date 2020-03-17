var mymap = L.map('maps').setView([14.559161, 121.014919], 6.83);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
//     {
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
//     }
// ).addTo(mymap);

//array regional circular objects declaration

var regions = [];
var regionalData = [
    {
        "coordinates" : [14.6019, 121.0355], // San Juan
        "place" : "San Juan City", 
        "cases" : 15
    },
    {
        "coordinates" : [14.6760, 121.0437], // Quezon City
        "place" : "Quezon City", 
        "cases" : 14
    },
    {
        "coordinates" : [14.5547, 121.0244], // Makati
        "place" : "Makati", 
        "cases" : 14
    },
    {
        "coordinates" : [14.5794, 121.0359], // Mandaluyong
        "place" : "Mandaluyong", 
        "cases" : 5
    },
    {
        "coordinates" : [15.0794, 120.6200], // Pampanga
        "place" : "Pampanga", 
        "cases" : 3
    },
    {
        "coordinates" : [14.6417, 120.4818], // Bataan
        "place" : "Bataan", 
        "cases" : 1
    },
    {
        "coordinates" : [14.1407, 121.4692], // Laguna
        "place" : "Laguna", 
        "cases" : 1
    },
    {
        "coordinates" : [13.7565, 121.0583], // Batangas
        "place" : "Batangas", 
        "cases" : 2
    },
    {
        "coordinates" : [14.4791, 120.8970], // Cavite
        "place" : "Cavite", 
        "cases" : 2
    },
    {
        "coordinates" : [14.6037, 121.3084], // Rizal
        "place" : "Rizal", 
        "cases" : 4
    },
    {
        "coordinates" : [9.6282, 122.9888], // Negros Oriental
        "place" : "Negros Oriental", 
        "cases" : 1
    },
    {
        "coordinates" : [9.8500, 124.1435], // Bohol
        "place" : "Bohol", 
        "cases" : 1
    },
    {
        "coordinates" : [8.5046, 124.6220], // Misamis Oriental
        "place" : "Misamis Oriental", 
        "cases" : 1
    },
];

for(let i = 0; i < regionalData.length; i++){
    regions[i] = L.circleMarker(regionalData[i]["coordinates"], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: regionalData[i]["cases"]
    }).addTo(mymap);

    regions[i].bindPopup(regionalData[i]["place"] + ": " + regionalData[i]["cases"] + " case/s");
}

// var circle = L.circle([14.559161, 121.014919], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 50_000 //in meters
// }).addTo(mymap);

// var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(mymap);
// }

// mymap.on('click', onMapClick);

