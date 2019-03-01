var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/WeatherConstants');
var ObjectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
    list: [],
    editing: false
}

var WeatherStore = ObjectAssign({},EventEmitter.prototype,{
    addChangeListener: function(cb) {
        this.on(CHANGE_EVENT, cb);
      },
    
      removeChangeListener: function(cb) {
        this.removeListener(CHANGE_EVENT, cb);
      },
    
      getList: function() {
        return _store;
      }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case AppConstants.GET_WEATHER:

        break;

        case AppConstants.GET_WEATHER_RESPONSE:
            _store.list.push(action)
        break;
    }
})