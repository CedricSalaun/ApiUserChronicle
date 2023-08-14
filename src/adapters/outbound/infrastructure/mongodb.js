import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

export class MongoDBAdapter {
  constructor(databaseName) {
    this.databaseName = databaseName;
    this.client = new MongoClient(`mongodb://${MONGODB_URI}:27017`, { useNewUrlParser: true, useUnifiedTopology: true });
    this.db = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.databaseName);

      return this.db;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  async close() { return this.client.close(); }
}
