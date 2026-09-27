# fast-content-hash

High-performance content hashing for Node.js. Provides FNV-1a and MurmurHash3 implementations with optional native bindings for improved throughput.

## Install

```bash
npm install fast-content-hash
```

## Usage

```js
const { fnv1a, murmur3, hash } = require('fast-content-hash');

fnv1a('hello world');    // => 'd58b3fa7'
murmur3('hello world');  // => '5e928f0f'

hash('hello world');                // FNV-1a (default)
hash('hello world', 'murmur3');     // MurmurHash3
hash(Buffer.from('binary data'));   // Buffer input
```

## Native Bindings

When available, prebuilt native bindings are downloaded during install for better performance. If unavailable, the pure JavaScript implementation is used automatically.

## License

MIT
