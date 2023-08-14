import base64url from 'base64url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { JWT_KEY } = process.env;

export class JWTAdapter {
  decodeToken(base64Token) {
    try {
      const token = base64url.decode(base64Token);
      return jwt.decode(token, JWT_KEY);
    } catch(error) {
      console.error('Error decoding JWT:', error);
      throw new Error(error);
    }
  }

  generateToken(payload) {
    try {
      const token = jwt.sign(payload, JWT_KEY, { expiresIn: '24h' });
      return base64url(token);
    } catch(error) {
      console.error('Error creating JWT:', error);
      throw new Error(error);
    }
  }

  verifyToken(base64Token) {
    try {
      const token = base64url.decode(base64Token);
      return jwt.verify(token, JWT_KEY);
    } catch(error) {
      throw new Error('Invalid token');
    }
  }

  async hash(payload) { return bcrypt.hash(payload, 3); }

  compare({ data, hash }) { return bcrypt.compare(data, hash); }
}
