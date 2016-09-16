/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX = module.exports, toArray = Function.call.bind(Array.prototype.slice);

EX.quot = function (x) {
  return ((typeof x) === 'string' ? JSON.stringify(x) : String(x));
};

EX.err = function objErr(errMsg) {
  var details = toArray(arguments, 1), errObj;
  if (errMsg instanceof Error) {
    errObj = errMsg;
    errMsg = errObj.message;
  }
  if (details.length) { errMsg += ': ' + details.map(EX.quot).join(', '); }
  errMsg = String(this) + ': ' + errMsg;
  if (errObj) {
    errObj.message = errMsg;
    errObj.origin = this;
    return errObj;
  }
  return new Error(errMsg);
};

EX.try = function objTry(func, args, details) {
  var ctx = this;
  if (Array.isArray(func)) {
    ctx = func[1];
    func = func[0];
  }
  if ((typeof func) === 'string') { func = ctx[func]; }
  try {
    return func.apply(ctx, (args || []));
  } catch (err) {
    details = EX.err.apply(this, [err].concat(details || []));
    throw details;
  }
};















EX.proto = { err: EX.err, try: EX.try };
