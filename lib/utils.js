function makeLocation(info) {
  return {
    formatted_query: info.display_name,
    latitude: info.lat,
    longitude: info.lon
  };
}

function makeWeatherArray(responseData) {
  const slicedWeather = responseData.data.slice(0, 7);

  const weatherArray = slicedWeather.map(day => {
    return {
      forecast: day.weather.description,
      time: day.valid_date
    };
  }); 
  return weatherArray;
}

function makeReviews(businessArr) { 
  
  const slicedBusinessArr = businessArr.slice(0, 4);
  
  return slicedBusinessArr.map(business => {
    return {
      name: business.name,
      image_url: business.image_url,
      price: business.price,
      rating: business.rating,
      url: business.url
    };
  });
}

module.exports = { makeLocation, makeWeatherArray, makeReviews };