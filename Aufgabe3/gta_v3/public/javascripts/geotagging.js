// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");





/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
// ... your code here ...
function updateLocation () {
    //die Funktion ruft die Methode findLocation auf
    LocationHelper.findLocation(function (locationHelper) {
        //api key
        const mapManager = new MapManager('HltU54BEnKkv8JTPR4OPpEmjzjtUNOTs');
        
        document.getElementById("latitude_in").setAttribute("value", locationHelper.latitude);
        document.getElementById("longitude_in").setAttribute("value", locationHelper.longitude);
        document.getElementById("latitude_hidden").setAttribute("value", locationHelper.latitude);
        document.getElementById("longitude_hidden").setAttribute("value", locationHelper.longitude);
        document.getElementById("mapView").setAttribute("src", mapManager.getMapUrl(locationHelper.latitude, locationHelper.longitude, [], 15))
    })
}
// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {updateLocation();});

/*
document.addEventListener("DOMContentLoaded", () => {
    alert("Please change the script 'geotagging.js'");
});
*/