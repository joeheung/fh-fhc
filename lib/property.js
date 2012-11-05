
module.exports = property;
property.usage = "fhc property list" +
               "\nfhc property set";

var fhreq = require("./utils/request");
var fhc = require("./fhc");
var common = require("./common");

function property(args, cb){
  if(args.length === 0) return cb(property.usage);
  if(args.length > 0){
    var action = args[0];
    switch(action){
      case "list":
        return list(cb);
        break;
      case "set":
        if(args.length < 2) return cb(property.usage);
        return set(args[1], cb);
        break;
      default :
        return cb(property.usage);
        break;
    }
  }
}

function list(cb){
  var payload = {
  	"fields":["domainName","name","value"], 
  	"eq":["domainName",fhc.target]
  }

  common.doApiCall(fhreq.getFeedHenryUrl(), "/box/srv/1.1/ent/ten/DomainProp/list", payload, "Error Listing items: ", function(err, data){
    if(err) return cb(err);
    return cb(undefined, data);
  });
}

function set(key, value, cb){
  var payload = {
  	"fields":["domainName","name","value"], 
  	"eq":["domainName",fhc.target]
  }

  common.doApiCall(fhreq.getFeedHenryUrl(), "/box/srv/1.1/ent/ten/DomainProp/list", payload, "Error Listing items: ", function(err, data){
    if(err) return cb(err);
    return cb(undefined, data);
  });

  // console.log(key + value)
}
