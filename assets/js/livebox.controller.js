(function() {
  'use strict';

  angular
    .module('gladys')
    .controller('liveboxCtrl', liveboxCtrl);

  liveboxCtrl.$inject = ['notificationService', 'deviceService', 'paramService', 'moduleService', '$scope'];

  function liveboxCtrl(notificationService, deviceService, paramService, moduleService, $scope) {
    /* jshint validthis: true */
    var vm = this;

    vm.ipDecoder = '';
    vm.moduleId = '';

    vm.saveParams = saveParams;
    vm.init = init;

    function init(moduleId, moduleSlug) {
      var child = document.getElementsByClassName('nav nav-tabs');
      child[0].parentNode.removeChild(child[0]);

      vm.moduleId = moduleId;
      vm.moduleSlug = moduleSlug;
      getParam(moduleId);
    }

    function getParam(moduleId) {
      paramService.getByModule(moduleId)
        .then(function(data) {
          vm.params = data.data
          if (vm.params[0].value === '1.1.1.1') {
            notificationService.errorNotification('please enter the IP of the decoder and then run a configuration')
          }
          vm.ipDecoder = vm.params[0].value
        });
    }

    function saveParams() {
      var param = {
        name: 'DECODEUR_LIVEBOX',
        value: vm.ipDecoder,
        type: 'hidden',
        module: vm.moduleId
      }
      return paramService.update('DECODEUR_LIVEBOX', param)
        .then(function(result) {
          return createDevice(vm.ipDecoder);
        });
    }

    function createDevice(ip) {
      //return new Promise(function(resolve, reject) {
      // Check if IP is valid IP address
      var ipRegExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
      if (!ipRegExp.test(ip)) { reject(new Error('You entered invalid IP address!')) }
      if (ip === '1.1.1.1') { reject(new Error('Please indicate the correct IP address of your decoder in the "DECODEUR_LIVEBOX" parameter.')) }

      // if valid IP, create device and deviceTypes
      var newDevice = {
        name: 'livebox decoder',
        protocol: 'wifi',
        service: 'livebox',
        identifier: ip
      };

      var newType = [{
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
        }
      ];

      return deviceService.create(newDevice, newType)
        .then(function(data) {
          notificationService.successNotification('device "livebox decoder" created, with id ' + data.data.device.id)
        })
        .catch(function(err) {
          notificationService.errorNotification('error when creating the device and deviceTypes.')
        });
    }

  }
})();