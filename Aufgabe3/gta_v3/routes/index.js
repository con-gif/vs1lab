// File origin: VS1LAB A3

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * Define module dependencies.
 */

const express = require('express');
const router = express.Router();

/**
 * The module "geotag" exports a class GeoTagStore. 
 * It represents geotags.
 * 
 * TODO: implement the module in the file "../models/geotag.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag.js');

/**
 * The module "geotag-store" exports a class GeoTagStore. 
 * It provides an in-memory store for geotag objects.
 * 
 * TODO: implement the module in the file "../models/geotag-store.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store.js');
const store = new GeoTagStore();
/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

// TODO: extend the following route example if necessary
router.get('/', (req, res) => {
  const geotags = store.geotags;
  res.render('index', { taglist: geotags, set_latitude: "", set_longitude:"", set_mapView: JSON.stringify(geotags) })
});

/**
 * Route '/tagging' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the tagging form in the body.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * Based on the form data, a new geotag is created and stored.
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the new geotag.
 * To this end, "GeoTagStore" provides a method to search geotags 
 * by radius around a given location.
 */

// TODO: ... your code here ...
router.post('/tagging', (req, res) => {
  const geotag = new GeoTag(req.body.latitude_in, req.body.longitude_in, req.body.name_in, req.body.hashtag_in);
  store.addGeoTag(geotag);
  const geotags = store.getNearbyGeoTags(geotag.latitude, geotag.longitude);
  res.render('index', { taglist: geotags, set_latitude: req.body["latitude_in"], set_longitude: req.body["longitude_in"], set_mapView: JSON.stringify(geotags) })
});
/**
 * Route '/discovery' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the discovery form in the body.
 * This includes coordinates and an optional search term.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the given coordinates.
 * If a search term is given, the results are further filtered to contain 
 * the term as a part of their names or hashtags. 
 * To this end, "GeoTagStore" provides methods to search geotags 
 * by radius and keyword.
 */

// TODO: ... your code here ...
router.post('/discovery', (req, res) => {
  let geotags;
  if (req.body.query_in) {
      geotags = store.searchNearbyGeoTags(req.body.query_in, req.body.latitude_hidden, req.body.longitude_hidden);
  } else {
      geotags = store.getNearbyGeoTags(req.body.latitude_hidden, req.body.longitude_hidden);
  }

  res.render('index', {
      taglist: geotags,
      set_latitude: req.body["latitude_hidden"],
      set_longitude: req.body["longitude_hidden"],
      set_mapView: JSON.stringify(geotags)
  });
});
module.exports = router;
