module.exports = {
    switchState: require('./television/livebox.switchState'),
    pause : require('./television/livebox.pause'),
	play : require('./television/livebox.play'),
	stop : require('./television/livebox.pause'),
	rewind : require('./television/livebox.rewind'),
    fastForward : require('./television/livebox.fastForward'),
    volumeUp : require('./television/livebox.volumeUp.js'),
    volumeDown : require('./television/livebox.volumeDown.js'),
    setMuted : require('./television/livebox.setMuted'),
    setChannel : require('./television/livebox.setChannel'),
    pressKey : require('./television/livebox.pressKey'),
    openMenu : require('./television/livebox.openMenu'),
    openInfo : require('./television/livebox.openInfo'),
    rec : require('./television/livebox.rec'),
    programPlus : require('./television/livebox.programPlus'),
    programMinus : require('./television/livebox.programMinus'),
    programVod: require('./television/livebox.programVod')
};
