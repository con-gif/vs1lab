// File origin: VS1LAB A3, A4

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
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');

/**
 * The module "geotag-store" exports a class GeoTagStore. 
 * It provides an in-memory store for geotag objects.
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');
const store = new GeoTagStore();
// App routes (A3)

/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */


// API routes (A4)

/**
 * Route '/api/geotags' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the fields of the Discovery form as query.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As a response, an array with Geo Tag objects is rendered as JSON.
 * If 'searchterm' is present, it will be filtered by search term.
 * If 'latitude' and 'longitude' are available, it will be further filtered based on radius.
 */

// TODO: ... your code here ...
router.get('/api/geotags', (req, res) => {
  let geotags = store.geotags;
  let searchterm = req.query.searchterm;
  let latitude = req.query.latitude;
  let longitude = req.query.longitude;

  if(searchterm === undefined && latitude === undefined && longitude === undefined) {
    res.json(geotags);
  }

  else if(searchterm !== undefined && (latitude === undefined || longitude === undefined)) {
    geotags = store.searchGeoTags(searchterm);
  }

  else if(searchterm !== undefined && latitude !== undefined && longitude !== undefined) {
    geotags = store.searchNearbyGeoTags(searchterm, latitude, longitude);
  }
  res.json(geotags);
});


/**
 * Route '/api/geotags' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * The URL of the new resource is returned in the header as a response.
 * The new resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...
router.post('/api/geotags', (req, res) => {
  const { latitude_hidden, longitude_hidden, name_hidden, hashtag_hidden } = req.body;
  const newId = store.geotags.length;
  const geoTag = new GeoTag(latitude_hidden, longitude_hidden, name_hidden, hashtag_hidden, newId);
  store.addGeoTag(geoTag);
  res.setHeader('Location', '/api/geotags/' + geoTag.tagId);
  res.status(201).json(geoTag);
});

/**
 * Route '/api/geotags/:id' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * The requested tag is rendered as JSON in the response.
 */

// TODO: ... your code here ...
router.get('/api/geotags/:id', (req, res) => {
  let geoTagId = req.params.id;
  let foundTag = store.searchTagByID(geoTagId);
  res.status(200).json(foundTag);
});

/**
 * Route '/api/geotags/:id' for HTTP 'PUT' requests.
 * (http://expressjs.com/de/4x/api.html#app.put.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 * 
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * Changes the tag with the corresponding ID to the sent value.
 * The updated resource is rendered as JSON in the response. 
 */

// TODO: ... your code here ...
router.put('/api/geotags/:id', (req, res) => {
  let geoTagId = req.params.id;
  let foundTag = store.searchTagByID(geoTagId);
  store.removeGeoTag(geoTagId);
  const { latitude_hidden, longitude_hidden, name_hidden, hashtag_hidden} = req.body;
  const geoTag = new GeoTag(latitude_hidden, longitude_hidden, name_hidden, hashtag_hidden, geoTagId);
  // Add the new geotag to the store
  store.addGeoTag(geoTag);
  // Return the new resource as JSON in the response
  res.status(201).json(geoTag);
});


/**
 * Route '/api/geotags/:id' for HTTP 'DELETE' requests.
 * (http://expressjs.com/de/4x/api.html#app.delete.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * Deletes the tag with the corresponding ID.
 * The deleted resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...
router.delete('/api/geotags/:id', (req, res) => {
  let geoTagId = req.params.id;
  let foundTag = store.searchTagByID(geoTagId);
  store.removeGeoTag(geoTagId);
  res.status(200).json(foundTag);
});


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
  const newId = store.geotags.length;
  const geotag = new GeoTag(req.body.latitude_in, req.body.longitude_in, req.body.name_in, req.body.hashtag_in, newId);
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


module.exports = router;
