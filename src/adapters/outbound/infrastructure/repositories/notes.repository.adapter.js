import { ObjectId } from 'mongodb';

import { BaseRepositoryAdapter } from './base.repository.adapter.js';

export class NotesRepositoryAdapter extends BaseRepositoryAdapter {
  async createNote({ _id, content }) {
    return this.mongoSession(async (db) => {
      const now = new Date();
      const collection = db.collection('notes');
      const { insertedId } = await collection.insertOne({
        userId: new ObjectId(_id),
        content,
        createdAt: now,
        lastUpdatedAt: now
      });
      console.log('\x1b[34m%s\x1b[0m', 'Note created successfully');

      return this.getNoteById(insertedId);
    });
  }

  async getNotesByUserId(_id) {
    return this.mongoSession(async (db) => {
      const notes = await db.collection('notes')
      .find({ userId: new ObjectId(_id) })
      .sort({ createdAt: -1 });
      return notes.toArray();
    });
  }

  async getNoteById(_id) {
    return this.mongoSession(async (db) => {
      const note = await db.collection('notes').findOne({ _id: new ObjectId(_id) });
      return note ? { ...note, _id: note._id.toString(), userId: note.userId.toString() } : null;
    });
  }

  async updateNote({ _id, content }) {
    return this.mongoSession(async (db) => {
      await db.collection('notes').updateOne(
        { _id: new ObjectId(_id) },
        { $set: { content, lastUpdatedAt: new Date() } }
      );
      console.log('\x1b[34m%s\x1b[0m', 'Note updated successfully');

      return this.getNoteById(_id);
    });
  }

  async deleteNote(_id) {
    return this.mongoSession(async (db) => {
      await db.collection('notes').deleteOne({ _id: new ObjectId(_id) });

      console.log('\x1b[34m%s\x1b[0m', 'Note deleted successfully');
    });
  }
}
