const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const request = require('superagent');
const { formatLocation, formatWeather, formatReviews } = require('./mungingFunctions.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/location', async (req, res) => {
  try {
    //Need a const to use query params for the city
    const city = req.query.search;

    const locationData = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_API_KEY}&q=${city}&format=json`);

    const formattedResponse = formatLocation(locationData.body);

    res.json(formattedResponse);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async (req, res) => {
  try {
    //Need to set lat and lon to a const to use query params to make the URL dynamic
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    //We need the URL for the weather API with the key
    const weatherData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);

    //Call the munged weather function
    const formattedResponse = formatWeather(weatherData.body);

    res.json(formattedResponse);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/reviews', async (req, res) => {
  try {
    //Need to set lat and lon to a const to use query params to make the URL dynamic
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    //We need the URL for the weather API with the key
    const reviewData = await request
      .get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`)
      .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
      .set('Accept', 'application/json');

    //Call the munged weather function
    const formattedResponse = formatReviews(reviewData.body);

    res.json(formattedResponse);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;


