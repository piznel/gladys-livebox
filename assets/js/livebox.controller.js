(function() {
  'use strict';

  angular
    .module('gladys')
    .controller('liveboxCtrl', liveboxCtrl);

    liveboxCtrl.$inject = ['notificationService', 'deviceService','paramService', 'moduleService', '$scope'];

  function liveboxCtrl(notificationService, deviceService, paramService, moduleService, $scope) {
    /* jshint validthis: true */
    var vm = this;
    vm.ipDecoder = '';

    var param = {
      name: 'DECODEUR_LIVEBOX',
      value: '1.1.1.1',
      type: 'hidden',
      module: ''
    }

    vm.saveParams = saveParams;

    activate()

    function activate() {
      console.log('ACTIVATE')
      return getLiveboxId()
      .then(function(id) {
        return paramService.get(id)
      })
      .then(function(ip) {
        console.log(ip)
        if (ip == '1.1.1.1' ) {
          notificationService.errorNotification('please enter the IP of the decoder and then run a configuration')
        }
        vm.ipDecoder = ip;
        console.log('vm.ipDecoder 1', vm.ipDecoder)
      })
    }

    function saveParams() {
      console.log('vm.ipDecoder 2', vm.ipDecoder)
      param.value = vm.ipDecoder;
      return paramService.update(param)
        .then((result) => {
          return createDevice(result);
        })
        .then(() => {

        })
    }

    function createDevice(ip) {
      //return new Promise(function(resolve, reject) {
      // Check if IP is valid IP address
      var ipRegExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
      if (!ipRegExp.test(ip)) { reject(new Error('You entered invalid IP address!')) }
      if (ip === '1.1.1.1') { reject(new Error('Please indicate the correct IP address of your decoder in the "DECODEUR_LIVEBOX" parameter.')) }

      // if valid IP, create device and deviceTypes
      const Newdevice = {
        device: {
          name: 'livebox decoder',
          protocol: 'wifi',
          service: 'livebox',
          identifier: ip
        },
        types: [{
            name: 'Power',
            type: 'binary',
            category: 'television',
            identifier: 'Power',
            sensor: false,
            min: 0,
            max: 1,
          },
          {
            name: 'Mute',
            type: 'push',
            identifier: 'Mute',
            category: 'television',
            sensor: false,
            min: 0,
            max: 1,
          },
        ]
      }
      return deviceService.create(Newdevice)
        .then((result) => {
            notificationService.successNotification('device "livebox decoder" created, with id ' + result.device.id)
        });
    }

    function getLiveboxId() {
      return moduleService.get()
        .then(function(modules) {
          for (let module of modules) {
            if (module.slug == 'livebox') {
              return Promise.resolve(module.id)
            }
          }
        })
    }

  }
})();