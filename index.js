
module.exports = function(sails) {
	const install = require('./lib/livebox.install.js')
	const setup = require('./lib/livebox.setup.js');
	const exec = require('./lib/livebox.exec.js');
	const television = require('./lib/livebox.js');
	const uninstall = require('./lib/livebox.uninstall.js');
 
    return {
			install: install,
			setup: setup,
			exec: exec,
			television: television,
			uninstall: uninstall
    };
};
