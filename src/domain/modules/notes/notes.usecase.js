import { CustomError } from '../../services/error.js';

export class NotesUsecase {
  constructor(notesOutboundPort, tokenOutboundPort) {
    this.notesOutboundPort = notesOutboundPort;
    this.tokenOutboundPort = tokenOutboundPort;
  }

  async getNotes(token) {
    const { _id } = this.tokenOutboundPort.decodeToken(token);
    return this.notesOutboundPort.getNotesByUserId(_id);
  }

  async createNote({ token, content }) {
    const { _id } = this.tokenOutboundPort.decodeToken(token);
    return this.notesOutboundPort.createNote({ _id, content });
  }

  async updateNote({ token, content, noteId }) {
    const { _id: userId } = this.tokenOutboundPort.decodeToken(token);

    const note = await this.notesOutboundPort.getNoteById(noteId);

    this.validateNoteOwnership(note, userId);

    return this.notesOutboundPort.updateNote({ _id: note._id, content });
  }

  async deleteNote({ token, noteId }) {
    const { _id: userId } = this.tokenOutboundPort.decodeToken(token);

    const note = await this.notesOutboundPort.getNoteById(noteId);

    this.validateNoteOwnership(note, userId);

    await this.notesOutboundPort.deleteNote(note._id);
  }

  validateNoteOwnership(note, userId) {
    if (!note) throw new CustomError('Cet identifiant est inconnu', 404);
    if (note.userId !== userId) throw new CustomError('Accès non autorisé à cette note', 403);
  }
}
