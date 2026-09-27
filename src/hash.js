'use strict';

function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

function murmur3(str, seed = 0) {
  let h = seed >>> 0;
  const len = str.length;
  const remainder = len & 3;
  const bytes = len - remainder;

  for (let i = 0; i < bytes; i += 4) {
    let k = (str.charCodeAt(i) & 0xff) |
            ((str.charCodeAt(i + 1) & 0xff) << 8) |
            ((str.charCodeAt(i + 2) & 0xff) << 16) |
            ((str.charCodeAt(i + 3) & 0xff) << 24);
    k = Math.imul(k, 0xcc9e2d51);
    k = (k << 15) | (k >>> 17);
    k = Math.imul(k, 0x1b873593);
    h ^= k;
    h = (h << 13) | (h >>> 19);
    h = Math.imul(h, 5) + 0xe6546b64;
  }

  let k = 0;
  switch (remainder) {
    case 3: k ^= (str.charCodeAt(bytes + 2) & 0xff) << 16;
    case 2: k ^= (str.charCodeAt(bytes + 1) & 0xff) << 8;
    case 1: k ^= str.charCodeAt(bytes) & 0xff;
            k = Math.imul(k, 0xcc9e2d51);
            k = (k << 15) | (k >>> 17);
            k = Math.imul(k, 0x1b873593);
            h ^= k;
  }

  h ^= len;
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;

  return (h >>> 0).toString(16).padStart(8, '0');
}

module.exports = { fnv1a, murmur3 };
