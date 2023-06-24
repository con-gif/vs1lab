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
        
        document.getElementById("latitude_in").setAttribute("value", latitude);
        document.getElementById("longitude_in").setAttribute("value", longitude);
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

function addTag(event) {
    event.preventDefault();

    const latitude = document.getElementById("latitude_in").value;
    const longitude = document.getElementById("longitude_in").value;
    const tagname = document.getElementById("name_in").value;
    const hashtag = document.getElementById("hashtag_in").value;

    const data = {
       "latitude_hidden" : latitude,
       "longitude_hidden" : longitude,
       "name_hidden" : tagname,
       "hashtag_hidden" : hashtag
    }

    postGeoTag("http://localhost:3000/api/geotags", data)
    .catch(err => console.error(err));

    getGeoTags("http://localhost:3000/api/geotags").then(data=>updateGeoTags(data));
}

function searchTag(event) {
    event.preventDefault();

    const searchTerm = document.getElementById("query_in").value;
    const url = `http://localhost:3000/api/geotags/?searchterm=${searchTerm}`;

    getGeoTags(url)
        .then(data => updateGeoTags(data));
}


async function postGeoTag(url, data) {
    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    return response;
}

async function getGeoTags(url) {
    const response = await fetch(url, {
        method: "GET",
        headers:{"Content-Type": "application/json"},
    });
    return response.json();
}



var updateGeoTags = function (geoTags) {
    let imageView = document.getElementById("mapView");
    imageView.dataset.tags = JSON.stringify(geoTags);
    LocationHelper.findLocation(updateLocation);

    var geos = document.getElementById("discoveryResults");
    geos.innerHTML = null;
    for (var key in geoTags) {
        var li = document.createElement("li");
        li.innerHTML = geoTags[key].name_hidden + " (" + geoTags[key].latitude_hidden + "," + geoTags[key].longitude_hidden + ") " + geoTags[key].hashtag_hidden;
        li.id = "discoveryResultGeoTags";
        geos.appendChild(li);
    }
};

if (JSON.stringify(document.getElementById("longitude_hidden").value)) {
    LocationHelper.findLocation(updateLocation);
  }

  add_button.addEventListener("click", addTag);
  discovery_buton.addEventListener("click", searchTag);
