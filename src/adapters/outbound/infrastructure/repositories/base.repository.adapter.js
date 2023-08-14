import { MongoDB } from '../../../../index.js';

export class BaseRepositoryAdapter {
  async mongoSession(callback) {
    const db = await MongoDB.connect();
    try {
      return await callback(db);
    } catch(error) {
      console.error('Error:', error);
      throw error;
    } finally {
      await MongoDB.close();
    }
  }
}
