
module.exports = admin;
admin.usage = "Usage:" +
  "\n  fhc admin appstore" +
  "\n  fhc admin auditlog" +
  "\n  fhc admin devices" +
  "\n  fhc admin groups" +
  "\n  fhc admin policies" +
  "\n  fhc admin storeitemgroups" +
  "\n  fhc admin storeitems" +
  "\n  fhc admin users";

function admin(args, cb){
  if(args.length < 1 ) return cb(null, admin.usage);

  var argAdmin = args[0];
  var reqFunc = require('./admin-' + argAdmin + '.js');
  if( ! reqFunc ) return cb('unknown action : ' + argAdmin);
  args.shift();
  
  return reqFunc(args, cb);
}