export class NotesOutboundPort {
  constructor(notesRepositoryAdapter) {
    this.notesRepositoryAdapter = notesRepositoryAdapter;
  }

  async createNote(payload) {
    return this.notesRepositoryAdapter.createNote(payload);
  }

  async getNotesByUserId(payload) {
    return this.notesRepositoryAdapter.getNotesByUserId(payload);
  }

  async getNoteById(payload) {
    return this.notesRepositoryAdapter.getNoteById(payload);
  }

  async updateNote(payload) {
    return this.notesRepositoryAdapter.updateNote(payload);
  }

  async deleteNote(payload) {
    return this.notesRepositoryAdapter.deleteNote(payload);
  }
}
