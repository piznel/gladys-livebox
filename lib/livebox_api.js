(function() {

  var http = require("http");

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
    "POWER": "116:0",
    "Shutdown": "116:1,116:0",
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

  /**
   * Constructor
   *
   * @param {String} ipAddress The IP Address of the TV
   */
  var livebox = function(ipAddress) {
    // Check if ipAddress is valid IP address
    var ipRegExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

    if (ipRegExp.test(ipAddress)) {
      this.ipAddress = ipAddress;
    } else {
      throw new TypeError('You entered invalid IP address!');
    }
  };

  livebox.prototype.sendRequest = function(key) {
    var url = '';

    if (key === 'info') {
      url = '/remoteControl/cmd?operation=10'
    } else {
      url = '/remoteControl/cmd?operation=01&key=' + key
    }

    var postRequest = {
      host: 'http://' + this.ipAddress,
      path: url,
      port: 8080,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }


    var req = http.request(postRequest, function(res) {
      var output = '';
      console.log(options.host + ':' + res.statusCode);
      res.setEncoding('utf8');

      res.on('data', function(chunk) {
        output += chunk;
      });

      res.on('end', function() {
        var obj = JSON.parse(output);
        onResult(res.statusCode, obj);
      });
    });

    req.on('error', function(err) {
      //res.send('error: ' + err.message);
    });

    req.end();

    return this;

  };

  livebox.prototype.sendCommand = function(command) {
    var key = commands[command].split(':').join('&mode=').split(',')
    while (key.length) {
      this.sendRequest(key.shift())
        .then(function(response) {
          return response
        })
        .catch(function(reason) {
          return reason
        });
    }
    return this;

  };

  // Export the constructor
  module.exports = livebox;

}).call(this);