const express = require('express');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./modules/schema.js');
const { env, initializeFirebase } = require('./config/config.js');

// 🔥 Inicializar Firebase ANTES de cualquier uso de DB
initializeFirebase();

const startServer = async () => {
  const app = express();

  // Configuración de Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }), // Contexto útil si luego usas auth, headers, etc.
  });

  await server.start();

  // Aplica middleware de Apollo Server
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = 3000; // Puerto por defecto

  const httpServer = http.createServer(app);
  httpServer.listen(PORT, () => {
    console.log(`Servidor GraphQL listo en http://localhost:${PORT}/graphql`);
  });

};

startServer();