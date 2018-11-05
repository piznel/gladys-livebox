# gladys-livebox

## Installation

* Add this module in Gladys
* Add livebox_TV_LIST on Gladys parameters with value livebox TV ip (if you have more than one TV you can separate each IP by this | like this IP_livebox_1|IP_livebox_2|IP_livebox_3)
* Restart Gladys.
* Click on livebox configuration button to install each TV set at step 2 on Gladys

## Usage 

Turn on the TV :
```
gladys.modules.livebox.television.switchState({state:true, device:DEVICE_ID});
```
Turn off the TV :
```
gladys.modules.livebox.television.switchState({state:false, device:DEVICE_ID});
```
Media control :
```
gladys.modules.livebox.television.pause({device:DEVICE_ID}});
gladys.modules.livebox.television.play({device:DEVICE_ID}});
gladys.modules.livebox.television.stop({device:DEVICE_ID}});
gladys.modules.livebox.television.rewind({device:DEVICE_ID}});
gladys.modules.livebox.television.fastForward({device:DEVICE_ID}});
gladys.modules.livebox.television.skipPrevious({device:DEVICE_ID}});
gladys.modules.livebox.television.skipNext({device:DEVICE_ID}});
gladys.modules.livebox.television.openInfo({device:DEVICE_ID}});
gladys.modules.livebox.television.rec({device:DEVICE_ID}});
```
Volume control :
```
gladys.modules.livebox.television.volumeUp({device:DEVICE_ID}});
gladys.modules.livebox.television.volumeDown({device:DEVICE_ID}});
gladys.modules.livebox.television.setVolume({volume:15, device:DEVICE_ID});
gladys.modules.livebox.television.getVolume({device:DEVICE_ID}});
gladys.modules.livebox.television.setMuted({status:true, device:DEVICE_ID});
gladys.modules.livebox.television.setMuted({status:false, device:DEVICE_ID});
```
Change channel (1 to 9 only) :
```
gladys.modules.livebox.television.setChannel({channel:9, device:DEVICE_ID});
```
Navigate on TV :
```
gladys.modules.livebox.television.pressKey({key:"OK", device:DEVICE_ID});
gladys.modules.livebox.television.pressKey({key:"RIGHT", device:DEVICE_ID});
gladys.modules.livebox.television.pressKey({key:"LEFT", device:DEVICE_ID});
gladys.modules.livebox.television.pressKey({key:"UP", device:DEVICE_ID});
gladys.modules.livebox.television.pressKey({key:"DOWN", device:DEVICE_ID});
gladys.modules.livebox.television.pressKey({key:"BACK", device:DEVICE_ID});
gladys.modules.livebox.television.openMenu({key:"BACK", device:DEVICE_ID});
```