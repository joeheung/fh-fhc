
module.exports = ping;
ping.ping = ping;

ping.usage = "fhc ping <app-id>";

var log = require("./utils/log");
var fhc = require("./fhc");
var fhreq = require("./utils/request");
var common = require("./common");
var util = require('util');
var request = require('request');
var hosts = require('./hosts');
var ini = require('./utils/ini');

// Main ping entry point
function ping (args, cb) {
  if (args.length === 0){
    return cb(ping.usage);
  }

  var target = ini.get('live') ? 'live' : 'development';
  var appId = fhc.appId(args[0]);
  return pingApp(appId, args[1] || target , cb);
};

// ping an app
function pingApp(appId, deployTarget, cb) {
  hosts.hosts([appId], function(err, resp){
    if(err) return cb(err);
    var url;
    if(deployTarget === 'live') {
      url = resp.hosts['live-url'];
    } else {
      url = resp.hosts['development-url'];
    }
    url = url + '/sys/info/ping';
    log.silly(url, "Pinging url");
    request(url, function (err, response, body) {
      if(err) return cb(err);
      log.silly(response.statusCode, "Ping response statusCode");
      log.silly(body, "Ping response body");
      if(response.statusCode !== 200) return cb("Bad response: " + util.inspect(body) + " code: " + response.statusCode);
      return cb(undefined, body);
    });
  });
}

// bash completion
ping.completion = function (opts, cb) {
  common.getAppIds(cb);  
};
