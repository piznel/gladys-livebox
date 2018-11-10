const shared = require('./livebox.shared.js');

module.exports = function init() {

var param = {
  name: 'DECODEUR_LIVEBOX',
  value: '1.1.1.1',
}
var ipDecoder = '';

return gladys.param.getValue(param.name)
  .catch(() => {
    sails.log.error('please enter the IP of the decoder in the parameter "DECODEUR_LIVEBOX" and then run a new configuration');
    return gladys.param.setValue(param);
  })
  .then((ip) => {
    if (ip !== '1.1.1.1' && ip.length > 0) {
      ipDecoder = ip;
      return getStatus(ipDecoder)
        .then(function() {
          setInterval(getStatus(ipDecoder), 30000)
        });

    } else {
      sails.log.error('please enter the IP of the decoder in the parameter "DECODEUR_LIVEBOX" and then run a new configuration')
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
        if (typeof result.result.data.activeStandbyState !== 'undefined' && (result.result.data.activeStandbyState).length === 1) {
          // save power status
          shared.setStatusPower(parseInt(result.result.data.activeStandbyState) === 1 ? false : true);

          const value = (parseInt(result.result.data.activeStandbyState) === 1 ? 0 : 1);
          var options = {
            deviceIdentifier: ip,
            deviceService: "livebox",
            deviceTypeIdentifier: "Power"
          }

          // update the power devicetype
          gladys.deviceType.getByIdentifier(options)
            .then(function(deviceType) {
              resolve(gladys.deviceState.create({ 'value': value, 'devicetype': deviceType.id }))
            })
        }
      })
      .catch((err) => reject(err));
  });
}