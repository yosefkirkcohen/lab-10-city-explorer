function makeLocation(info) {
  return {
    formatted_query: info.display_name,
    latitude: info.lat,
    longitude: info.lon
  };
}

module.exports = { makeLocation };