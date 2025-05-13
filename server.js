const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable CORS
server.use(cors());

// Use default middlewares (logger, static, etc.)
server.use(middlewares);

// Set default router
server.use(router);

// Listen on port 3001
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});
