module.exports = function() {
  sails.log.error('install')
  console.log('******************INSTALL********************')

  const param = {
    name: 'DECODEUR_LIVEBOX',
    value: '1.1.1.1',
    type: 'hidden',
    module: ''
  };

  var boxLivebox = {
    uuid: '451a8766-407b-43ca-b1d4-2f2787ef4f6b',
    title: 'Orange TV',
    path: 'api/hooks/livebox/livebox.ejs',
    view: 'dashboard'
  }

  gladys.boxType.create(boxLivebox)
    .then(function(boxType) {
      sails.log.debug(`box type created, with id ${boxType.id} !`);
    })
    .catch(function(err) {
        sails.log.debug('impossible to create the Livebox type :', err)
    });

  return getLiveboxId()
    .then(function(id) {
      param.id = id;
      return gladys.param.getValue(param.name)
    })
    .then((result) => {
      return result;
    })
    .catch(() => {
      return gladys.param.setValue(param)
    });



};

function getLiveboxId() {
  return gladys.module.get()
    .then(function(modules) {
      for (let module of modules) {
        if (module.slug == 'livebox') {
          return Promise.resolve(module.id)
        }
      }
    })
}