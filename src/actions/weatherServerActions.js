var AppDispatcher = require('../dispatcher/AppDispatcher')
var WeatherConstants = require('../dispatcher/WeatherConstants')

module.exports = {
    receiveWeather: function(response){
        AppDispatcher.handleServerAction({
            actionType: WeatherConstants.GET_WEATHER_RESPONSE,
            response: response
        })
    }
}