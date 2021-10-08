const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
const { makeLocation } = require('./fetch-utils.js');

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

    // const location = {
    //   formatted_query: response.body[0].display_name,
    //   latitude: response.body[0].lat,
    //   longitude: response.body[0].lon
    // };

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
    
    

    const slicedWeather = response.body.data.slice(0, 7);

    const weatherArray = slicedWeather.map(day => {
      return {
        forecast: day.weather.description,
        time: day.valid_date
      };
    });  
    

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

    const mappedArr = businessArr.map(business => {
      return {
        name: business.name,
        image_url: business.image_url,
        price: business.price,
        rating: business.rating,
        url: business.url
      };
    });

    res.json(
      mappedArr
    );
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
