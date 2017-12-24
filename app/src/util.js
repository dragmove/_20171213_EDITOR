const global = typeof self == 'object' && self.self === self && self ||
  typeof global == 'object' && global.global === global && global ||
  this ||
  {};

export const isDefined = (obj) => {
  if (obj === null || typeof obj === 'undefined') return false;
  return true;
};

export const isString = (obj) => {
  if (!isDefined(obj)) return false;

  return (obj.constructor === String);
};

export const isObject = (obj) => {
  if (!isDefined(obj)) return false;

  return (obj.constructor === Object);
};

export const namespace = (namespace, parent) => {
  if (!isString(namespace)) throw new TypeError('namespace parameter type of namespace() must be String.');

  if (!(isObject(parent) || !isDefined(parent))) {
    throw new TypeError('parent parameter type of namespace() must be Object or null or undefined.');
  }

  var ns = parent || global;

  if (namespace) {
    var parts = namespace.split('.');

    for (var i = 0, max = parts.length; i < max; i++) {
      if (!ns[parts[i]]) ns[parts[i]] = {};
      ns = ns[parts[i]];
    }
  }

  return ns;
};