require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');

const { makeLocation, makeWeatherArray, makeReviews } = require('../lib/utils.js');
const weatherData = require('../data/test-data-weather.js');
const reviewsData = require('../data/test-data-reviews');


describe('app routes', () => {
  describe('routes', () => {

    test('make a location', async() => {

      const infoObject = {
        'place_id': '276026975',
        'licence': 'https://locationiq.com/attribution',
        'osm_type': 'relation',
        'osm_id': '11894050',
        'boundingbox': [
          '1.0913531',
          '1.4639513',
          '-77.8637982',
          '-77.6124349'
        ],
        'lat': '1.27757385',
        'lon': '-77.72891340825922',
        'display_name': 'Santacruz, Los Abades, Nariño, Pacífica, Colombia',
        'class': 'boundary',
        'type': 'administrative',
        'importance': 0.55,
        'icon': 'https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png'
      };

      const expectation = 
        {
          'formatted_query': 'Santacruz, Los Abades, Nariño, Pacífica, Colombia',
          'latitude': '1.27757385',
          'longitude': '-77.72891340825922'
        };

      const actual = makeLocation(infoObject);
      

      

      expect(actual).toEqual(expectation);
    });

    test('make reviews', async() => {

      const responseBody = reviewsData;

      const expectation = 
      [
        {
          'name': 'Bi-Rite Creamery',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/2kn-N3RglQj6d-I2AIPcuA/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/bi-rite-creamery-san-francisco?adjust_creative=eTlbrVTbMYic-G7IGIRmxg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=eTlbrVTbMYic-G7IGIRmxg'
        },
        {
          'name': 'Brenda\'s French Soul Food',
          'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/olWZc1SyhyPkz1btzms_hg/o.jpg',
          'price': '$$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/brendas-french-soul-food-san-francisco-5?adjust_creative=eTlbrVTbMYic-G7IGIRmxg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=eTlbrVTbMYic-G7IGIRmxg'
        },
        {
          'name': 'Tartine Bakery',
          'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/nPUUXYVVa3CHJh5yzH8Xnw/o.jpg',
          'price': '$$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/tartine-bakery-san-francisco-3?adjust_creative=eTlbrVTbMYic-G7IGIRmxg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=eTlbrVTbMYic-G7IGIRmxg'
        },
        {
          'name': 'Shizen Vegan Sushi Bar & Izakaya',
          'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/-1BWnyjrsDmTmXH_3wZl_w/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/shizen-vegan-sushi-bar-and-izakaya-san-francisco?adjust_creative=eTlbrVTbMYic-G7IGIRmxg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=eTlbrVTbMYic-G7IGIRmxg'
        }
      ];

      const actual = makeReviews(responseBody);
      
      expect(actual).toEqual(expectation);

    });

    test('make weather', async() => {

      const responseBody = weatherData;

      const expectation = 
      [
        {
          'forecast': 'Broken clouds',
          'time': '2021-10-08'
        },
        {
          'forecast': 'Thunderstorm with rain',
          'time': '2021-10-09'
        },
        {
          'forecast': 'Thunderstorm with heavy rain',
          'time': '2021-10-10'
        },
        {
          'forecast': 'Heavy rain',
          'time': '2021-10-11'
        },
        {
          'forecast': 'Light rain',
          'time': '2021-10-12'
        },
        {
          'forecast': 'Overcast clouds',
          'time': '2021-10-13'
        },
        {
          'forecast': 'Broken clouds',
          'time': '2021-10-14'
        }
      ];

      const actual = makeWeatherArray(responseBody);
      
      expect(actual).toEqual(expectation);
    });

  });
});