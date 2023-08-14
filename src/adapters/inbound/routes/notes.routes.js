import { NotesController } from '../controllers/notes.controller.js';
import { JWTAdapter } from '../../outbound/services/jwt.js';
import { NotesOutboundPort } from '../../../domain/modules/notes/notes.outbound.port.js';
import { NotesRepositoryAdapter } from '../../outbound/infrastructure/repositories/notes.repository.adapter.js';
import { NotesUsecase } from '../../../domain/modules/notes/notes.usecase.js';
import { TokenOutboundPort } from '../../../domain/shared/token.outbound.port.js';

const jwtAdapter = new JWTAdapter();
const tokenOutboundPort = new TokenOutboundPort(jwtAdapter);

const notesRepositoryAdapter = new NotesRepositoryAdapter();
const notesOutboundPort = new NotesOutboundPort(notesRepositoryAdapter);

const notesUseCase = new NotesUsecase(notesOutboundPort, tokenOutboundPort);
const notesController = new NotesController(notesUseCase, tokenOutboundPort);

export const notesRoutes = {
  GET: { '/notes': notesController.getNotes.bind(notesController) },
  PUT: { '/notes': notesController.createNote.bind(notesController) },
  PATCH: { '/notes/:id': notesController.updateNote.bind(notesController) },
  DELETE: { '/notes/:id': notesController.deleteNote.bind(notesController) },
};
