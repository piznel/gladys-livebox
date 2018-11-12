(function() {
  'use strict';

  angular
    .module('gladys')
    .controller('liveboxCtrl', liveboxCtrl);

  liveboxCtrl.$inject = ['televisionService', 'deviceService', 'boxService'];

  function liveboxCtrl(televisionService, deviceService, boxService) {
    /* jshint validthis: true */
    var vm = this;
    vm.devices = [];
    vm.devicetypes = [];
    vm.deviceId = null;
    vm.displayAskDeviceForm = false;
    vm.currentDeviceName = '';

    vm.selectDevice = selectDevice;

    //vm.updateBoxParams = updateBoxParams;
    vm.init = init;
    vm.switchState = switchState;
    vm.setMuted = setMuted;
    vm.volumeUp = volumeUp;
    vm.volumeDown = volumeDown;
    vm.pressKey = pressKey;
    vm.programVod = programVod;
    vm.programPlus = programPlus;
    vm.programMinus = programMinus;

    function selectDevice(device) {
      console.log('typeof device', typeof(device))
      console.log('device', device)
      if (typeof(device) === 'string') {
        device = JSON.parse(device);
      }
      boxService.update(vm.boxId, { params: { deviceId: device.id, name: device.name } });
      // update box
      setBoxInformation(device.id, device.name);
    }


    function init(id) {
      vm.boxId = id;
      boxService.getById(id)
        .then(function(data) {
          vm.box = data.data;
          getDevices();
        });
      waitForNewValue();
    }

    function getDevices() {
      deviceService.get()
        .then(function(data) {
          var tempDevices = data.data;
          tempDevices.forEach(function(device) {
            if (device.service === 'livebox') {
              vm.devices.push({ id: device.id, name: device.name });
              vm.devicetypes[device.id] = new Array();
              deviceService.getDeviceTypesDevice(device.id)
                .then(function(data) {
                  data.data.forEach(function(deviceType) {
                    vm.devicetypes[device.id].push(deviceType);
                  })
                });
            }
          })
        })
        .then(function() {
          if (vm.box.params && vm.box.params.deviceId) {
            setBoxInformation(vm.box.params.deviceId, vm.box.params.name);
          } else {
            vm.displayAskDeviceForm = true;
          }
        });
    }

    function setBoxInformation(deviceId, deviceName) {
      vm.displayAskDeviceForm = false;
      vm.deviceId = deviceId;
      vm.currentDeviceName = deviceName;
      vm.currentPowerState = null;
      getData(deviceId);
    }

    function getData(deviceId) {
      vm.devicetypes[deviceId].forEach(function(devicetype) {
        console.log('devicetype', devicetype)
        if (devicetype.identifier == 'Power') {
          vm.currentPowerState = devicetype.lastValue;
          vm.devicePowerId = devicetype.id;
        }
      });
    }

    function switchState() {
      return televisionService.switchState({ device: vm.deviceId, state: !vm.currentPowerState, deviceTypeId: vm.devicePowerId })
        .then(function() {

        });
    }

    function volumeDown() {
      return televisionService.volumeDown({ device: vm.deviceId })
        .then(function() {

        });
    }

    function volumeUp() {
      return televisionService.volumeUp({ device: vm.deviceId })
        .then(function() {

        });
    }

    function setMuted() {
      return televisionService.setMuted({ device: vm.deviceId, state: !vm.currentMuteState })
        .then(function() {

        });
    }


    function programVod() {
      return televisionService.programVod({ device: vm.deviceId, controlType: 'programVod' })
        .then(function() {

        });
    }


    function programPlus() {
      return televisionService.programPlus({ device: vm.deviceId, controlType: 'programPlus' })
        .then(function() {

        });
    }

    function programMinus() {
      return televisionService.programMinus({ device: vm.deviceId, controlType: 'programMinus' })
        .then(function() {

        });
    }

    function pressKey(key) {
      return televisionService.pressKey({ device: vm.deviceId, key: key })
        .then(function() {

        });
    }

    // waiting for websocket message
    function waitForNewValue() {
      io.socket.on('newDeviceState', function(deviceState) {
        if (deviceState.devicetype === vm.devicePowerId) {
          vm.currentPowerState = deviceState.value;
        }
      });
    }
  }
})();