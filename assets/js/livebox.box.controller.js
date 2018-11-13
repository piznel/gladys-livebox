(function() {
  'use strict';

  angular
    .module('gladys')
    .controller('liveboxCtrl', liveboxCtrl);

  liveboxCtrl.$inject = ['televisionService', 'deviceService', 'boxService', '$http', '$q'];

  function liveboxCtrl(televisionService, deviceService, boxService, $http, $q) {
    /* jshint validthis: true */
    var vm = this;
    vm.devices = [];
    vm.devicetypes = new Array;
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
		})
		.then(function() {
			if (vm.box.params && vm.box.params.deviceId) {
				setBoxInformation(vm.box.params.deviceId, vm.box.params.name);
			} else {
				vm.displayAskDeviceForm = true;
			}			
		})
		.then(function() {
			waitForNewValue();
		});
    }

    function getDevices() {
      	deviceService.get()
        .then(function(data) {
          	var tempDevices = data.data;
		  	tempDevices = tempDevices.filter(function(device) {
				return device.service === 'livebox';
			});
			console.log('tempDevices', tempDevices);
			tempDevices = tempDevices.map(function(device) { 
				vm.devices.push({ id: device.id, name: device.name });
				deviceService.getDeviceTypesDevice(device.id)
				.then(function(data) {
					var tempDeviceType  = data.data.map(function(deviceType) {
						vm.devicetypes.push({ id: deviceType.id, identifier: deviceType.identifier, lastValue: deviceType.lastValue, deviceId: device.id});
					});
				})
			})
		})	
    }

    function setBoxInformation(deviceId, deviceName) {
		vm.displayAskDeviceForm = false;
		vm.deviceId = deviceId;
		vm.currentDeviceName = deviceName;
		vm.currentPowerState = null;
		readJson();
		getData(deviceId);
    }

    function getData(deviceId) {
		console.log('deviceId',deviceId)
		console.log('vm.devicetypes',vm.devicetypes)
		console.log('vm.devicetypes.length', (vm.devicetypes).length)
		console.log('isArray', Array.isArray(vm.devicetypes))

      var deviceTypeFiltering = vm.devicetypes.filter(function(devicetype) {
		  return (devicetype.identifier === 'Power' && devicetype.deviceId === deviceId)
	  });
        console.log('deviceTypeFiltering', deviceTypeFiltering)
          vm.currentPowerState = deviceTypeFiltering[0].lastValue;
          vm.devicePowerId = deviceTypeFiltering[0].id;

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
		console.log('key :', key)
      return televisionService.pressKey({ device: vm.deviceId, key: 'epg:'+key })
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