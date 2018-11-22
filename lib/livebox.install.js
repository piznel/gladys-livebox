module.exports = function() {

  const boxLivebox = {
    uuid: '451a8766-407b-43ca-b1d4-2f2787ef4f6b',
    title: 'Orange TV',
    path: 'api/hooks/livebox/livebox.ejs',
    view: 'dashboard'
  };

  var param = {
    name: 'DECODEUR_LIVEBOX',
    value: '',
    type: 'hidden',
    module: ''
  }

  var moduleId = '';

  return gladys.boxType.create(boxLivebox)
    .then(function(boxType) {
      sails.log.debug(`box type created, with id ${boxType.id} !`);
    })
    .then(function() {
      return getLiveboxId()
        .then(function(result) {
          moduleId = result.id;
          param.module = moduleId;

          return gladys.param.getValue('DECODEUR_LIVEBOX')
            .then(function(paramLivebox) {
              param.value = paramLivebox
            })
            .catch(function() {
              param.value = '1.1.1.1'
            })
            .then(function() {
              return setParamLivebox(param)
            });
        })
        .catch(function(err) {
          sails.log.error(err)
        });
    })
    .catch(function(err) {
      sails.log.debug(err)
    });
};

function getLiveboxId() {
  return new Promise(function(resolve, reject) {
    gladys.module.get()
      .then(function(modules) {
        modules.forEach(function(element) {
          if (element.slug === 'livebox') {
            return resolve(element)
          }
        })
      })
      .catch(function(err) {
        return reject(err)
      })
  })
}

function setParamLivebox(param) {
  return gladys.param.setValue(param)
    .then(function() {
      return Promise.resolve();
    })
    .catch(e => {
      sails.log.error(`Livebox module: param don't exist. Error ${e}`)
      return Promise.reject()
    })

}