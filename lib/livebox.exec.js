const commandsList = require('./livebox.js')
var stop = require('./television/livebox.stop.js')
var start = require('./television/livebox.start.js')

module.exports = function(params) {
  params.device = params.deviceType.device;
  switch(params.deviceType.deviceTypeIdentifier) {
      case 'Power':
        params.state = params.state.value;
        switch(!!params.state) {
          case true :
            start(params)
            break;
          case false :
                  stop(params)
            break;
          default:
            sails.log.error('error durring switch !')
        }
      break;
      case 'Mute':
        params.status = !!params.state.value;
        commandsList.setMuted(params);
      break;
      case 'Channel':
        params.channel = params.state.value;
        commandsList.setChannel(params)
      break;
      case 'Sound':
    //rework
        params.volume = params.state.value;
        commandsList.setVolume(params)
      break;
      default:
        sails.log.error('Error during livebox command')
      break;
    }
  };
