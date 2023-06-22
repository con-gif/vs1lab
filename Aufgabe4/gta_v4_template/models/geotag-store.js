// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
const GeoTagExamples = require('../models/geotag-examples.js');
const GeoTag = require('../models/geotag.js');
class InMemoryGeoTagStore{
        // TODO: ... your code here ...
    #geotags = [];
    
    //tagliste aus geotag-examples.js
    constructor() {
        var tagList = GeoTagExamples.tagList;
        for(var i = 0; i < tagList.length; i++) {
            this.#geotags.push(new GeoTag(tagList[i][1], tagList[i][2], tagList[i][0], tagList[i][3], i));
           
        }
    }   

    addGeoTag(geoTag) {
        if(geoTag instanceof GeoTag) {
            this.#geotags.push(geoTag);
        } else {
            console.log("Not a GeoTag");
        }
    }

    removeGeoTag(id) {
        for (let i = 0; i < this.#geotags.length; i++) {
          if (id == this.#geotags[i].tagId) {
            this.#geotags.splice(i, 1);
            break; // Exit the loop after removing the geotag
          }
        }
      }
    getNearbyGeoTags(latitudeIn, longitudeIn) {
        let arrTemp = [];
        for (let i = 0; i < this.#geotags.length; i++) {
          let latitudeTemp = this.#geotags[i].latitude;
          let longitudeTemp = this.#geotags[i].longitude;
          let dLat = (latitudeTemp * Math.PI) / 180 - (latitudeIn * Math.PI) / 180;
          let dLon = ((longitudeTemp - longitudeIn) * Math.PI) / 180;
          let distance =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((latitudeIn * Math.PI) / 180) *
              Math.cos((latitudeTemp * Math.PI) / 180) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          let c = 2 * Math.atan2(Math.sqrt(distance), Math.sqrt(1 - distance));
          let d = 6371 * c;
          if (d <= 150) {
            arrTemp.push(this.#geotags[i]);
          }
          console.log(d);
        }
        return arrTemp;
      }
    
    searchNearbyGeoTags(keyword, latitude, longitude){
        var NearbyGeoTags = this.getNearbyGeoTags(latitude, longitude)
        var arrTemp = []; 
        for ( var i = 0; i < NearbyGeoTags.length; i++) {
            const tempTag = NearbyGeoTags[i];
            if(tempTag.hashtag_hidden.includes(keyword) ||tempTag.name_hidden.includes(keyword)) {
                arrTemp.push(NearbyGeoTags[i]);
            }
        }
        return arrTemp;
    }
    searchTagByID(id) {
        var arrTemp = []
        for (var i = 0; i < this.#geotags.length; i++) {
            if (id == this.#geotags[i].tagId) {
              arrTemp.push(this.#geotags[i]);
            }
          }
          return arrTemp; // Return null if no matching GeoTag is found
        }

    get geotags() {
        return this.#geotags;
    }   

}
module.exports = InMemoryGeoTagStore
