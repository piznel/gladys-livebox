const commandsList = require('./livebox.js')

module.exports = function(params) {
  sails.log.error('exec:params :',params)
  params.device = params.deviceType.device;
  switch(params.deviceType.deviceTypeIdentifier) {
      case 'Power':
        params.state = params.state.value;
        commandsList.switchState(params);
      break;
      case 'Mute':
        params.status = !!params.state.value;
        switch(params.state.value) {
          case 1:
            commandsList.setMuted(params);
          break;
          case 0:
            commandsList.setMuted(params);
          break;
        }
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
