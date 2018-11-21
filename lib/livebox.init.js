const shared = require('./livebox.shared.js');

module.exports = function init() {
  var ipDecoder = '';

  return gladys.param.getValue('DECODEUR_LIVEBOX')
    .catch(function() {})
    .then((ip) => {
      if (typeof(ip) !== 'undefined' && ip !== '1.1.1.1' && ip.length > 0) {
        ipDecoder = ip;
        var setTimer = setInterval(function() {
          if (shared.getStatusInterval()) {
            getStatus(ipDecoder)
              .catch(function(err) {
                sails.log.error('livebox init : ', err)
              })
          } else {
            clearInterval(setTimer);
          }
        }, 10000)
      } else {
        sails.log.error('please enter the IP of the livebox decoder in the module configuration and then run a new configuration')
      }
    });
}

const getContent = function(url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
  })
};

const getStatus = function(ip) {
  return new Promise((resolve, reject) => {
    getContent('http://' + ip + ':8080/remoteControl/cmd?operation=10')
      .then((result) => {
        result = JSON.parse(result)
        if (typeof result.result.data.playedMediaId !== 'undefined' && (result.result.data.playedMediaId).length > 0) {
          var tmpChannel = parseInt(result.result.data.playedMediaId)
          gladys.socket.emit('livebox-channel', { ip: ip, channel: tmpChannel })
          gladys.emit('livebox-channel', { ip: ip, channel: tmpChannel })
        }

        if (typeof result.result.data.osdContext !== 'undefined' && result.result.data.osdContext === 'HOMEPAGE') {
          gladys.socket.emit('livebox-channel', { ip: ip, channel: 0 })
          gladys.emit('livebox-channel', { ip: ip, channel: 0 })
        }

        if (typeof result.result.data.activeStandbyState !== 'undefined' && (result.result.data.activeStandbyState).length === 1) {

          var tmpStatus = parseInt(result.result.data.activeStandbyState) === 1 ? false : true;

          // update the power devicetype
          var options = {
            deviceIdentifier: ip,
            deviceService: "livebox",
            deviceTypeIdentifier: "Power"
          }

          gladys.deviceType.getByIdentifier(options)
            .then(function(deviceType) {
              resolve(gladys.deviceState.create({ 'value': tmpStatus, 'devicetype': deviceType.id }))
            })
            .catch(function(err) {
              shared.setStatusInterval(false);
            })
        }
      })
      .catch((err) => reject(err));
  });
}