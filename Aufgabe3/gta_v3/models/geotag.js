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

    constructor(latitude, longitude, name, hashtag) {
        this.latitude_hidden = latitude;
        this.longitude_hidden = longitude;
        this.name_hidden = name;
        this.hashtag_hidden = hashtag;
        return this;
    }

    get latitude() {
        return this.latitude_hidden;
    }
    get longitude() {
        return this.longitude_hidden;
    }
    get name() {
        return this.name_hidden;
    }
    get hashtag() {
        return this.hashtag_hidden;
    }   
}

module.exports = GeoTag;
