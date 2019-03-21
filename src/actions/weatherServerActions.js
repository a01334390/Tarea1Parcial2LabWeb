var AppDispatcher = require('../dispatcher/AppDispatcher')
var WeatherConstants = require('../constants/WeatherConstants')

module.exports = {
    receiveWeather: function(response){
        AppDispatcher.handleServerAction({
            actionType: WeatherConstants.GET_WEATHER_RESPONSE,
            response: response
        })
    }
}