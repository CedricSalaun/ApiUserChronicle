import { findRouteHandler } from '../../../utils.js';
import { notesRoutes } from './notes.routes.js';
import { userRoutes } from './user.routes.js';

export async function handleRoute(req, res, payload) {
  const { method, url } = req;
  const routesHandler = findRouteHandler(method, url, notesRoutes, userRoutes);

  if (routesHandler) {
    try {
      const response = await routesHandler(req, payload);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    } catch ({ code, message }) {
      res.writeHead(code || 500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: message }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
}
