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
const GeoTag = require("./geotag");
const GeoTagExamples = require("./geotag-examples");
class InMemoryGeoTagStore{
     geotags = [];
    
    static get getGeotags() {
        return this.geotags;
        }

    constructor () {
        let tagList = GeoTagExamples.tagList;
        for (let i = 0; i < (GeoTagExamples.tagList).length; i++) {
            this.addGeoTag(new GeoTag(tagList[i][0], tagList[i][1], tagList[i][2], tagList[i][3]));
        }
    }
    addGeoTag(geotag) { 
            this.geotags.push(geotag);
    }
        
        removeGeoTag = (name) => {
                for(var i = 0; i < InMemoryGeoTagStore.geotags.length; i++){ //loops through the array
                        if(InMemoryGeoTagStore.geotags[i].name === name){ //checks if the name is equal to the name of the geotag
                                this.geotags.splice(i, 1); //removes the geotag from the array
                        }
                }
        }
        
            getNearbyGeoTags(latitude, longitude){
                var arrTemp = [];
                for( var i = 0; i < this.geotags.length; i++) {
                    var latitudeTemp = this.geotags[i].latitude;
                    var longitudeTemp = this.geotags[i].longitude;
                    var distance = Math.sqrt(Math.pow(latitudeTemp - latitude, 2) + Math.pow(longitudeTemp - longitude, 2));
                    if(distance <= 15) {
                        arrTemp.push(this.geoTags[i]);
                    } 
                }
                return arrTemp;
        
            }    
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
        
        }
        
module.exports = InMemoryGeoTagStore
