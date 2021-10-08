const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
const { makeLocation, makeWeatherArray, makeReviews } = require('./utils.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging



app.get('/location', async(req, res) => {
  try {

    const cityName = req.query.search;

    const response = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${cityName}&format=json`);
    
    const infoObj = response.body[0];

    const newLocation = makeLocation(infoObj);

    res.json(
      newLocation
    );
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async(req, res) => {
  try {

    const latitude = req.query.latitude;
    const longitude = req.query.longitude;

    const response = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_KEY}`);
    
    const responseData = response.body;
    const weatherArray = makeWeatherArray(responseData);

    res.json(
      weatherArray
    );
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/reviews', async(req, res) => {
  try {

    const latitude = req.query.latitude;
    const longitude = req.query.longitude;

    const response = await request.get(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}`)
      .set({
        Authorization: `Bearer ${process.env.REVIEWS_KEY}`
      });
    
    const businessArr = response.body.businesses;

    const mappedArr = makeReviews(businessArr);

    res.json(
      // mappedArr
      businessArr
    );
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
