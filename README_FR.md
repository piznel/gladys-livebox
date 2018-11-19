

### [English version](README.md)

# gladys-livebox : un module pour [Gladys](https://github.com/GladysProject)
Ce module vous permet de piloter le décodeur de la Livebox Orange depuis Gladys. Il est compatible avec la box native 'télévision'.
Il ajoute également une nouvelle box, qui vous permet de choisir votre chaîne sur une mosaïque d'image et de gérer les fonctions de base de votre décodeur (marche/arrêt, augmenter/diminuer/couper le son, avancer/reculer dans les chaînes) :

![image](https://user-images.githubusercontent.com/25089531/48671882-ec488a00-eb2e-11e8-8821-5700571b6496.png)

## Prérequis
Pour fonctionner, ce module nécessite :
 - Gladys version 3.11.4 au minimum

## Limitations
Actuellement, ne peut gérer qu'un seul décodeur.
 
## Installation

### 1. Ajouter ce module à Gladys
 
![image](https://user-images.githubusercontent.com/25089531/48671586-e81a6d80-eb2a-11e8-9450-5c5d8ca43329.png)
	
1 = `gladys-livebox`
2 = `0.1.0`
3 = `https://github.com/piznel/gladys-livebox.git`
4 = `livebox`
5 = Go ! :)
	
### 2. Redémarrer Gladys

![image](https://user-images.githubusercontent.com/25089531/48671552-3d09b400-eb2a-11e8-9ec1-2e683253f71c.png)

### 3. Mettre-à-jour le paramètre LIVEBOX_TV
 
 ![image](https://user-images.githubusercontent.com/25089531/48671595-29128200-eb2b-11e8-8c72-e31ec86c68a2.png)
 
 avec l'adresse IP de votre décodeur ( vous pouvez le trouver dans l'interface de gestion de votre Livebox ; elle est de la forme `192.168.1.22` )

### 4. Ajouter le périphérique 'livebox decoder'
Cliquez sur le bouton **configuration** du module 'gladys-livebox' dans la liste de vos modules, puis sur le nouveau bouton configuration **configuration** de la page qui s'ouvre :

![image](https://user-images.githubusercontent.com/25089531/48671733-1c8f2900-eb2d-11e8-96ab-527f728cc60e.png)

Le périphérique 'livebox decoder' est alors créé, avec ses périphériques associés.
**Important** : Il faut impérativement affecter votre `livebox decoder` à une pièce, dans la gestion de vos périphériques. 

### 4. Paramétrer la box
1- Dans 'paramétres', onglet 'box', ajouter alors la box de votre choix :
	
![image](https://user-images.githubusercontent.com/25089531/48671809-ea31fb80-eb2d-11e8-8127-58e06a7b83aa.png)

Box native : `television`
La box livebox : `box-Orange TV-title`

2- Amusez-vous bien !

Un grand merci à **[Mathieu Andrade] (https://github.com/MathieuAndrade)** et **[Vincent Besseau] (https://github.com/vincentBesseau)** pour leur aide et leur soutien dans la réalisation de mon premier module pour Gladys !
