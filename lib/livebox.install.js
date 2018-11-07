module.exports = function() {
    const param = {
		name: 'DECODEUR_LIVEBOX',
        value: '1.1.1.1',
        type: 'visible'
        };

    return gladys.param.getValue(param.name)
    .then((result) => {
        return result;
    })
    .catch(() => {
        return gladys.param.setValue(param)
    });
};
