var deleteDevice = require('./uninstall/livebox.deleteDevice.js');

module.exports = function uninstall() {

  var liveboxDevices = deleteDevice()

  var param = {
    name: "DECODEUR_LIVEBOX"
  }


  gladys.param.delete(param)
    .then(function(param) {
      sails.log.debug('suppression du paramètre "DECODEUR_LIVEBOX"');
    });

  var liveboxType = [];
  gladys.boxType.getAll()
    .then(function(boxTypes) {
      liveboxType = boxTypes.filter(function(boxType) {
        return (boxType.uuid === '451a8766-407b-43ca-b1d4-2f2787ef4f6b')
      })
      console.log('uninstall:liveboxType', JSON.stringify(liveboxType) )
    })
    .catch(function(err) {
      sails.log.error(err)
    });

  if (typeof(liveboxType) !== 'undefined') {
    var boxType = {
      id: liveboxType.id
    };
    gladys.boxType.delete(boxType)
      .then(function(boxType) {
        sails.log.debug('suppression du type de box "LIVEBOX"');
      })
      .catch(function(err) {
        sails.log.error(err)
      });
  };

  gladys.user.get()
    .then(function(users) {
      users.forEach(user => {
        deleteBox(user, liveboxDevices)
      })
    });
};


const deleteBox = function(user, liveboxDevices) {
  var options = {
    user: {
      id: user.id
    }
  }

  // list all boxes with 'livebox' service
  var boxLiveboxs = [];
  var boxTelevisions = [];

  gladys.box.getBoxUser(options)
    .then(function(boxs) {
      boxLiveboxs = boxs.filter(function(box) {
        return (box.service === 'livebox')
      })
      boxTelevision = boxs.filter(function(box) {
        return (box.service === 'television')
      })
    })
    .catch(function(err) {
      sails.log.error(`impossible to get box 'livebox'`)
    });

  // delete all 'livebox' boxes user  
  if (typeof(boxLiveboxs) !== 'undefined') {
    boxLiveboxs.forEach(function(boxLivebox) {
      var box = {
        id: boxLivebox.id
      };
      gladys.box.delete(box)
        .then(function(box) {
          sails.log.debug('Box "Livebox" deleted !');
        })
        .catch(function(err) {
          sails.log.error(`impossible to delete box 'livebox' with id ${box.id}`)
        });
    })
  }

  // delete television params box if device is a livebox device
  boxTelevisions.forEach(function(boxTelevision) {
    liveboxDevices.forEach(function(liveboxDevice) {
      if (boxTelevision.params.id === liveboxDevice.id) {
        var box = {
          id: boxTelevision.id,
          param: {}
        };
        gladys.box.update(box)
          .then(function(box) {
            // box updated ! 
          })
          .catch(function(err) {
            // something bad happened ! :/
          });
      }
    })
  })
}