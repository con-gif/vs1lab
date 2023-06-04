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
function updateLocation (helper) { {

        let latitude = helper.latitude;
        let longitude = helper.longitude;
        
        //tagging
        document.getElementById("latitude_in").setAttribute("value", latitude);
        document.getElementById("longitude_in").setAttribute("value", longitude);

        //discovery
        document.getElementById("latitude_hidden").setAttribute("value", latitude);
        document.getElementById("longitude_hidden").setAttribute("value", longitude);  

        let imageView = document.getElementById("mapView");
        let tagsAsString = imageView.getAttribute("data-tags");
        let tags = JSON.parse(tagsAsString);
        console.log(tags);

        const map = new MapManager('HltU54BEnKkv8JTPR4OPpEmjzjtUNOTs');
        const mapURL= map.getMapUrl(latitude, longitude, tags);
        document.getElementById("mapView").setAttribute("src", mapURL);
    }
}
if (document.getElementById("longitude_hidden").value && document.getElementById("latitude_hidden").value) {
    LocationHelper.findLocation(updateLocation);
}
