import 'dotenv/config';
import * as http from 'http';

import { MongoDBAdapter } from './adapters/outbound/infrastructure/mongodb.js';
import { handleRoute } from './adapters/inbound/routes/routesHandler.js';

const PORT = process.env.PORT || 3000;

const MongoDB = new MongoDBAdapter('notes-api');
export { MongoDB };

(async () => {
  const server = http.createServer(async (req, res) => {
    switch (req.method) {
      case 'POST':
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => handleRoute(req, res, body && JSON.parse(body)))
        break;
      default:
        break;
    }
  });

  server.listen(PORT, () => console.log('\x1b[32m%s\x1b[0m', `Server is running on port ${PORT}`));
})();

