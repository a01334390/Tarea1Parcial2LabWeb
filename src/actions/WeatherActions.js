var AppDispatcher = require('../dispatcher/AppDispatcher');
var WeatherConstants = require('../constants/WeatherConstants');
var WeatherAPI = require('../utils/weatherAPI');

module.exports = {
    getRandom: function() {
        AppDispatcher.handleViewAction({
          actionType: WeatherConstants.GET_WEATHER
        });
    
        WeatherAPI.get();
      }
}