const crypto = require('crypto');

// Generate a random 64-byte (512-bit) string, base64 encoded
const secretKey = crypto.randomBytes(64).toString('base64');

console.log(secretKey);
