(function() {
  'use strict';

  angular
    .module('gladys')
    .controller('liveboxCtrl', liveboxCtrl);

  liveboxCtrl.$inject = ['televisionService', 'deviceService', 'boxService', '$http'];

  function liveboxCtrl(televisionService, deviceService, boxService, $http) {
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

    function init(id) {
      console.log('INIT:START')
      vm.boxId = id;
      boxService.getById(id)
        .then(function(data) {
          vm.box = data.data;
        })
        .then(function() {
          getDevices();
        })
        .then(function() {
          waitForNewValue();
        });
      console.log('INIT:END')
    }

    function getDevices() {
      console.log('GETDEVICES:START')
      var tempDevices = [];

      deviceService.get()
        .then(function(data) {
          getDevicesLivebox(data.data)
        });
      getDeviceTypesLivebox(vm.devices)

      if (vm.box.params && vm.box.params.deviceId) {
        setBoxInformation(vm.box.params.deviceId, vm.box.params.name);
      } else {
        vm.displayAskDeviceForm = true;
      };
      console.log('GETDEVICES:END')
    }

    function getDevicesLivebox(devices) {
      devices.forEach(function(device) {
        if (device.service === 'livebox') {
          vm.devices.push({ id: device.id, name: device.name });
        }
      })
      console.log('getDevicesLivebox:vm.devices :', vm.devices)
    }

    function getDeviceTypesLivebox(devices) {
      console.log('getDeviceTypesLivebox:devices :', devices)
      devices.forEach(function(device) {
        deviceService.getDeviceTypesDevice(device.id)
          .then(function() {
            vm.devicetypes.push({ id: deviceType.id, identifier: deviceType.identifier, lastValue: deviceType.lastValue, deviceId: device.id });
          })
      });
      console.log('getDeviceTypesLivebox:vm.devicetypes :', vm.devicetypes)
    }

    function setBoxInformation(deviceId, deviceName) {
      console.log('SETBOXINFO:START')
      vm.displayAskDeviceForm = false;
      vm.deviceId = deviceId;
      vm.currentDeviceName = deviceName;
      vm.currentPowerState = null;
      readJson();
      getData(vm.deviceId);
      console.log('SETBOXINFO:END')
    }

    function getData(deviceId) {
      console.log('GETDATA:START - vm.devicetypes :', vm.devicetypes)
      console.log('GETDATA:START - vm.devicetypes-toString :', JSON.stringify(vm.devicetypes.toString()))
      vm.deviceTypeFiltering = vm.devicetypes.filter(function(devicetype) {
        return (devicetype.identifier === 'Power' && devicetype.deviceId === deviceId)
      });
      console.log('vm.deviceTypeFiltering', vm.deviceTypeFiltering)
      if (vm.deviceTypeFiltering.length > 0) {
        vm.currentPowerState = vm.deviceTypeFiltering[0].lastValue;
        vm.devicePowerId = vm.deviceTypeFiltering[0].id;
      }
      console.log('GETDATA:END')
    }

    function selectDevice(device) {
      console.log('SELECTDEVICE:START')
      if (typeof(device) === 'string') {
        device = JSON.parse(device);
      }
      boxService.update(vm.boxId, { params: { deviceId: device.id, name: device.name } });
      // update box
      setBoxInformation(device.id, device.name);
      console.log('SELECTDEVICE:END')
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
      return televisionService.pressKey({ device: vm.deviceId, key: 'epg:' + key })
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

    function readJson() {
      console.log('READJSON:START')
      var request = {
        method: 'get',
        url: './hooks/livebox/data/channels.json',
        dataType: 'json',
        contentType: "application/json"
      };
      vm.channels = new Array;
      $http(request)
        .success(function(data) {
          vm.channels = data.orange;
        })
        .error(function() {});
      console.log('READJSON:END')
    }
  }
})();