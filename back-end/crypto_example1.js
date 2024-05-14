const crypto = require('crypto');

function generateSecretToken() {
    // Generate a random buffer of bytes (e.g., 256 bits / 32 bytes)
    const randomBytes = crypto.randomBytes(64);

    // Convert the random bytes to a base64-encoded string
    const secretToken = randomBytes.toString('hex');

    return secretToken;
}

// Example usage
const jwtSecret = generateSecretToken();
console.log('JWT Secret Token:', jwtSecret);
