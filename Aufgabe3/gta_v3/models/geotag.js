// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
class GeoTag {

    latitude_in = '';
    longitude_in = '';
    name_in = '';
    hashtag_in = '';

    // TODO: ... your code here ...
    constructor(latitude_in, longitude_in, name_in, hashtag_in) {
        this.latitude = latitude_in;
        this.longitude = longitude_in;
        this.name = name_in;
        this.hashtag = hashtag_in;
        return this;
    }
    
}

module.exports = GeoTag;
