var Promise = require('bluebird');
var http = require("request-promise");

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
  "Left": "105:0",
  "Right": "106:0",
  "Down": "108:0",
  "Mute": "113:0",
  "VolDwn": "114:0",
  "VolUp": "115:0",
  "START": "116:0",
  "STOP": "116:1,116:0",
  "Home": "139:0",
  "Exit": "158:0",
  "Forward": "159:0",
  "Play": "164:0",
  "Stop": "164:0",
  "Record": "167:0",
  "Rewind": "168:0",
  "Ok": "352:0",
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
            sendRequest(key.shift(), ip)
                .then(function(result) {
                    console.log('sendCommand:sendRequest.result :', result)
                    return result
                })
                .catch(function(err) {
                console.log('sendCommand:sendRequest.err :', err)
                return err
            });
        }
    });
}


function sendRequest (key, ip) {
    var operation = '';

    if (key === 'info') {
        operation = '10';
        key=''
    } else {
        operation = '01'
    }

    var options = {
        uri: 'http://' + ip+'/remoteControl/cmd',
        port: 8080,
        qs: {
            operation: operation,
            key: key
        },
        headers: {
            'Content-Type': 'application/json'
        },
        json: true
    }

    var rp = require('request-promise');
   
    rp(options)
        .then(function (repos) {
            console.log('User has %d repos', repos.length);
            return repos
        })
        .catch(function (err) {
            return err
        });
  }