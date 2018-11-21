module.exports = function() {

  const boxLivebox = {
    uuid: '451a8766-407b-43ca-b1d4-2f2787ef4f6b',
    title: 'Orange TV',
    path: 'api/hooks/livebox/livebox.ejs',
    view: 'dashboard'
  };

  var moduleId = '';

  return gladys.boxType.create(boxLivebox)
    .then(function(boxType) {
      sails.log.debug(`box type created, with id ${boxType.id} !`);
    })
    .then(function() {
      return getLiveboxId()
        .then(function(result) {
          moduleId = result.id;
          return gladys.param.getValue('DECODEUR_LIVEBOX')
            .then(function(paramLivebox) {
              gladys.param.setValue({ name: 'DECODEUR_LIVEBOX', value: paramLivebox.value, type: 'hidden', module: moduleId })
            })
            .catch(() => {
              gladys.param.setValue({ name: 'DECODEUR_LIVEBOX', value: '1.1.1.1', type: 'hidden', module: moduleId })
            });
        })
    })
    .catch(function(err) {
      sails.log.debug(err)
    });
};

function getLiveboxId() {
  return new Promise(function(resolve) {
    gladys.module.get()
      .then(function(modules) {
        modules.forEach(function(element) {
          if (element.slug === 'livebox') {
            return resolve(element)
          }
        })
      });
  })
}