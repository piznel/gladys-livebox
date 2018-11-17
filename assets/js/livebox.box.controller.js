(function() {
  'use strict';

  angular
    .module('gladys')
    .controller('liveboxCtrl', liveboxCtrl);

  liveboxCtrl.$inject = ['televisionService', 'deviceService', 'boxService', '$http', '$scope'];

  function liveboxCtrl(televisionService, deviceService, boxService, $http, $scope) {
    var vm = this;

    vm.devices = [];
    vm.devicetypes = [];
    vm.deviceId = null;
    vm.displayAskDeviceForm = false;
    vm.currentDeviceName = '';
    vm.currentChannel = '';
    vm.currentUrl = '';
    vm.ipSelectedDevice = '';

    vm.init = init;
    vm.switchState = switchState;
    vm.setMuted = setMuted;
    vm.volumeUp = volumeUp;
    vm.volumeDown = volumeDown;
    vm.pressKey = pressKey;
    vm.programVod = programVod;
    vm.programPlus = programPlus;
    vm.programMinus = programMinus;
    vm.selectDevice = selectDevice;

    function init(id) {
      vm.boxId = id;
      boxService.getById(id)
      .then(function(data) {
        vm.box = data.data;
        getDevices();
      })
       waitForNewValue();
       return
    }

    function getDevices() {
      return deviceService.get(undefined,undefined,'livebox')
        .then(function(data) {
        return getDevicesLivebox(data.data)
      })
      .then(function(result) {
        return getDeviceTypesLivebox(result)
      })
      .then(function(result){
          if (vm.box.params && vm.box.params.deviceId) {
          setBoxInformation(vm.box.params.deviceId, vm.box.params.name, vm.box.params.ip);
        } else {
          vm.displayAskDeviceForm = true;
        };     
      })
    }

    function getDevicesLivebox(devices) {
      return new Promise(function(resolve, reject) {
        devices.forEach(function(device) {
            vm.devices.push({ id: device.id, name: device.name, ip: device.identifier });
        })
        return resolve(vm.devices);
      })
    }

    function getDeviceTypesLivebox(devices) {
      return new Promise(function(resolve, reject) {
        return devices.map(function(device) {
          return deviceService.getDeviceTypesDevice(device.id)
            .then(function(data) {
              data.data.map(deviceType => {
              vm.devicetypes.push({ id: deviceType.id, identifier: deviceType.identifier, lastValue: deviceType.lastValue, deviceId: device.id });
              });
              resolve(vm.devicetypes)
            })
        });
        return resolve(vm.devicetypes);
      })
    }

    function setBoxInformation(deviceId, deviceName, ipDevice) {
      vm.displayAskDeviceForm = false;
      vm.deviceId = deviceId;
      vm.currentDeviceName = deviceName;
      vm.currentPowerState = null;
      vm.ipSelectedDevice = ipDevice;
      readJson();
      getData(vm.deviceId);
    }

    function getData(deviceId) {
      vm.devicetypes.map(function(devicetype) {
        if ( devicetype.identifier === 'Power' && devicetype.deviceId === deviceId ) {
          vm.currentPowerState = devicetype.lastValue;
          vm.devicePowerId = devicetype.id;          
        }
      })
    }
    
    function selectDevice(device) {
      if (typeof(device) === 'string') {
        device = JSON.parse(device);
      }
      boxService.update(vm.boxId, { params: { deviceId: device.id, name: device.name, ip:device.ip } });
      // update box
      setBoxInformation(device.id, device.name, device.ip);
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
      return televisionService.pressKey({ device: vm.deviceId, key: 'epg:'+key })
        .then(function() {

        });
    }

    // waiting for websocket message
    function waitForNewValue() {
      io.socket.on('newDeviceState', function(deviceState) {
        if (deviceState.devicetype === vm.devicePowerId) {
          vm.currentPowerState = deviceState.value;
          $scope.$apply();
        }
      });
      io.socket.on('livebox-channel', function(newChannel) {
          if(vm.ipSelectedDevice == newChannel.ip) {
            var tmpChannel = vm.channels.filter(function(channel) {
              return (channel.epg === newChannel.channel)
            });
            if(tmpChannel.length === 1) {
            vm.currentChannel = tmpChannel[0].name;
            vm.currentUrl = tmpChannel[0].url;
            $scope.$apply()
            }
          }
         
         
      });
	  }
	
    function readJson() {
      var request = {
        method: 'get',
        url: './hooks/livebox/data/channels.json',
        dataType: 'json',
        contentType: "application/json"
      };
      vm.channels = new Array;
      $http(request)
        .success(function (data) {
          vm.channels = data.orange;
        })
        .error(function () {
      });
	  }
  }
})();