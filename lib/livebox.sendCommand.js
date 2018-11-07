var Promise = require('bluebird');

const commands = {
    "0": "512:0",
    "1": "513:0",
    "2": "514:0",
    "3": "515:0",
    "4": "516:0",
    "5": "517:0",
    "6": "518:0",
    "7": "519:0",
    "8": "520:0",
    "9": "521:0",
    "Up": "103:0",
    "LEFT": "105:0",
    "RIGHT": "106:0",
    "DOWN": "108:0",
    "MUTE": "113:0",
    "VOLDOWN": "114:0",
    "VOLUP": "115:0",
    "START": "116:0",
    "STOP": "116:1,116:0",
    "MENU": "139:0",
    "BACK": "158:0",
    "FASTFORWARD": "159:0",
    "PLAY": "164:0",
    "STOP_MEDIA": "164:0",
    "REC": "167:0",
    "REWIND": "168:0",
    "OK": "352:0",
    "VOD": "393:0",
  "PrgUp": "402:0",
  "PrgDwn": "403:0",
    "Info": "info",
}


module.exports = function sendCommand(functionName, params) {
    return new Promise(function(resolve, reject){
        var ip = params.deviceType.identifier;

        // Check if IP is valid IP address
        var ipRegExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
        if (!ipRegExp.test(ip)) { reject (new Error('You entered invalid IP address!'))}
        if (ip === '1.1.1.1') {reject (new Error('Please indicate the correct IP address of your decoder in the "DECODEUR_LIVEBOX" parameter.'))}

        // determines the command to be sent
        var key = commands[functionName].split(':').join('&mode=').split(',')
        while (key.length) {
            // calls the function to send the command
            return sendRequest(key.shift(), ip)
                .then(function(result) {
                    sails.log.debug('Livebox decoder response :', JSON.parse(html).result.message);
                    resolve(result)
                })
                .catch(function(err) {
                    sails.log.error('sendCommand:sendRequest.err :', err)
                    reject(err)
            });
        }
    });
}


function sendRequest (key, ip) {
    return new Promise(function(resolve, reject){
        var uri = '';
        if (key === 'info') {
            // http://192.168.1.32:8080/remoteControl/cmd?operation=10
            uri = '?operation=10';
        } else {
            // http://192.168.1.32:8080/remoteControl/cmd?operation=01&key=116&mode=0
            uri = '?operation=01&key='+key;
        }

        var url = 'http://' + ip + ':8080/remoteControl/cmd' + uri;
        getContent(url)
            .then((html) => {
                sails.log.debug('Livebox decoder response :', JSON.parse(html).result.message);
                resolve(html)
            })
            .catch((err) => {
                reject(err)
            });
        
    })  
  }

  const getContent = function(url) {
    // return new pending promise
    return new Promise((resolve, reject) => {
      // select http or https module, depending on reqested url
      const lib = url.startsWith('https') ? require('https') : require('http');
      const request = lib.get(url, (response) => {
        // handle http errors
        if (response.statusCode < 200 || response.statusCode > 299) {
           reject(new Error('Failed to load page, status code: ' + response.statusCode));
         }
        // temporary data holder
        const body = [];
        // on every content chunk, push it to the data array
        response.on('data', (chunk) => body.push(chunk));
        // we are done, resolve promise with those joined chunks
        response.on('end', () => resolve(body.join('')));
      });
      // handle connection errors of the request
      request.on('error', (err) => reject(err))
      })
  };