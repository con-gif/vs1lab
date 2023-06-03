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
            this.#geotags.push(new GeoTag(tagList[i][1], tagList[i][2], tagList[i][0], tagList[i][3]));
        }
    }   

    addGeoTag(geoTag) {
        if(geoTag instanceof GeoTag) {
            this.#geotags.push(geoTag);
        } else {
            console.log("Not a GeoTag");
        }
    }

    removeGeoTag(geoTag) {
        this.#geotags = this.#geotags.filter(function(deleteTag) {
            return deleteTag.name != geoTag.name;
            });
    }
    //TODO: getNearbyGeoTags
    getNearbyGeoTags(latitude, longitude){
        var arrTemp = [];
        for( var i = 0; i < this.geotags.length; i++) {
            var latitudeTemp = this.geotags[i].latitude;
            var longitudeTemp = this.geotags[i].longitude;
            var distance = Math.sqrt(Math.pow(latitudeTemp - latitude, 2) + Math.pow(longitudeTemp - longitude, 2));
            if(distance <= 15) {
                arrTemp.push(this.geotags[i]);
            } 
        }
        return arrTemp;

    }    

    //TODO: searchNearbyGeoTags
    searchNearbyGeoTags(keyword, latitude, longitude){
        var NearbyGeoTags = this.getNearbyGeoTags(latitude, longitude)
        var arrTemp = []; 
        for ( var i = 0; i < NearbyGeoTags.length; i++) {
            const tempTag = NearbyGeoTags[i];
            if(tempTag.hashtag.includes(keyword) ||tempTag.name.includes(keyword)) {
                arrTemp.push(NearbyGeoTags[i]);
            }
        }
        return arrTemp;
    }


    get geotags() {
        return this.#geotags;
    }   

}
module.exports = InMemoryGeoTagStore
