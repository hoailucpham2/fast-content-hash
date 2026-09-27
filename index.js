'use strict';

const { fnv1a, murmur3 } = require('./src/hash');

let nativeBinding = null;
try {
  nativeBinding = require('./build/Release/fchash.node');
} catch {}

module.exports = {
  fnv1a: nativeBinding ? nativeBinding.fnv1a : fnv1a,
  murmur3: nativeBinding ? nativeBinding.murmur3 : murmur3,
  hash(input, algorithm = 'fnv1a') {
    const fn = algorithm === 'murmur3' ? this.murmur3 : this.fnv1a;
    if (Buffer.isBuffer(input)) input = input.toString();
    return fn(input);
  },
  isNative: !!nativeBinding
};
