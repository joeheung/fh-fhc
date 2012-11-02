
module.exports = admin;
admin.usage = "\nfhc admin appstore" +
  "\nfhc admin auditlog" +
  "\nfhc admin devices" +
  "\nfhc admin groups" +
  "\nfhc admin policies" +
  "\nfhc admin storeitemgroups" +
  "\nfhc admin storeitems" +
  "\nfhc admin users";

function admin(args, cb){
  if(args.length < 1 ) return cb(null, admin.usage);

  var implArgs = args[0];
  var impl = require('./admin-' + implArgs + '.js');
  if( ! impl ) return cb('unknown action : ' + implArgs);
  delete args[0];
  return impl(args, cb);
}