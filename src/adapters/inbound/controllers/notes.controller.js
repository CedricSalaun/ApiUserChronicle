import { CustomError } from '../../../domain/services/error.js';

export class NotesController {
  constructor(notesUseCase, tokenOutboundPort) {
    this.notesUseCase = notesUseCase;
    this.tokenOutboundPort = tokenOutboundPort;
  }

  async getNotes(req) {
    const token = this.extractAndVerifyAccessToken(req.headers);

    try {
      const notes = await this.notesUseCase.getNotes(token);
      return { error: null, notes };
    } catch(error) {
      throw error;
    }
  }

  async createNote(req, { content }) {
    const token = this.extractAndVerifyAccessToken(req.headers);

    try {
      const note = await this.notesUseCase.createNote({ token, content });
      return { error: null, note };
    } catch(error) {
      throw error;
    }
  }

  async updateNote(req, { content }) {
    const token = this.extractAndVerifyAccessToken(req.headers);

    const noteId = this.extractParams(req.url);

    try {
      const note = await this.notesUseCase.updateNote({ token, content, noteId });
      return { error: null, note };
    } catch(error) {
      throw error;
    }
  }

  async deleteNote(req) {
    const token = this.extractAndVerifyAccessToken(req.headers);

    const noteId = this.extractParams(req.url);

    try {
      await this.notesUseCase.deleteNote({ token, noteId });
      return { error: null };
    } catch(error) {
      throw error;
    }
  }

  extractAndVerifyAccessToken(headers) {
    const token = headers['x-access-token'];
    if (!token) throw new CustomError('Utilisateur non connecté', 401);
    try {
      this.tokenOutboundPort.verifyToken(token);
      return token
    } catch(e) {
      throw new CustomError('Utilisateur non connecté', 401);
    }
  }

  extractParams(url) {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  }
}
