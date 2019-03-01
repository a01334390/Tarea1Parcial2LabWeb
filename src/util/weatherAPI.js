var weatherServerActions = require('../actions/weatherServerActions');
var request = require('superagent');

module.exports = {
    get: function(){
        request.get('api.openweathermap.org/data/2.5/forecast?id=524901&APPID=88662ffa10f78c6fed57cb3e118a58e2')
        .set('Accept','application/json')
        .end(function(err,response){
            if (err) return console.error(err);
            weatherServerActions.receiveWeather(response.body)
        })
    }
}