import { BaseRepositoryAdapter } from './base.repository.adapter.js';

export class UserRepositoryAdapter extends BaseRepositoryAdapter {
  async createUser(userData) {
    return this.mongoSession(async (db) => {
      const { insertedId } = await db.collection('users').insertOne(userData);
      console.log('\x1b[34m%s\x1b[0m', 'User created successfully');

      return { _id: insertedId.toString() };
    });
  }

  async getUserByUserName(username) {
    return this.mongoSession(async (db) => {
      const user = await db.collection('users').findOne({ username });

      return user ? { ...user, _id: user._id.toString() } : null;
    });
  }
}
