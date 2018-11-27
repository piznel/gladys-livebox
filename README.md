### [Version française ici !](README_FR.md)

# gladys-livebox : a [Gladys](https://github.com/GladysProject) module
This module allows you to control the Orange Livebox decoder. It works with Gladys' native "television" box.
It also adds a new box, which allows you to choose the channel on an image mosaic, and manage the basic functions (turn on/off, increase/decrease/mute the sound, change channel) :

![image](https://user-images.githubusercontent.com/25089531/48671882-ec488a00-eb2e-11e8-8821-5700571b6496.png)

## Prerequisites
This module requires:
 - Gladys version 3.11.4 or higher

## Limitations
Currently, can only manage one decoder. Only tested with Livebox and decoder V4.

## Installation

### 1. Add this module in Gladys
 
![image](https://user-images.githubusercontent.com/25089531/48671586-e81a6d80-eb2a-11e8-9450-5c5d8ca43329.png)
	
1 = `gladys-livebox`
2 = `0.1.0`
3 = `https://github.com/piznel/gladys-livebox.git`
4 = `livebox`
5 = Go ! :)
	
### 2. Restart Gladys

![image](https://user-images.githubusercontent.com/25089531/48671552-3d09b400-eb2a-11e8-9ec1-2e683253f71c.png)

### 3. Update parameters' Livebox
 Click on the Livebox module configuration button : the configuration page opens.
 
 ![image](https://user-images.githubusercontent.com/25089531/49091316-d427e780-f25f-11e8-8c76-442fc05faa24.png)
 
 Enter the IP address of your Livebox decoder. ( You can find it by connecting to the management interface of your Livebox, something like `192.168.1.22` )

### 4. Added livebox decoder device
Now, click on the **configuration** button.
The livebox device is then created, with these associated devicetypes.
**Important** : Assign the `livebox decoder` device to a room, in the management of your devices. 

### 4. Set up the box
1- In your settings, tab Box, add the box of your choice:
	
![image](https://user-images.githubusercontent.com/25089531/48671809-ea31fb80-eb2d-11e8-8127-58e06a7b83aa.png)

Native box: `television`
the livebox box: `box-Orange TV-title`

2- Enjoy !

Special Thanks to **[Mathieu Andrade](https://github.com/MathieuAndrade)** and **[Vincent Besseau](https://github.com/vincentBesseau)** for their help and support in the realization of my first module for Gladys!
