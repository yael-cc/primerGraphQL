const express = require('express');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const path = require('path'); // Asegúrate de importar 'path'
const { typeDefs, resolvers } = require('./modules/schema.js');
const { env, initializeFirebase } = require('./config/config.js');

// Inicializar Firebase ANTES de cualquier uso de DB
initializeFirebase();

const startServer = async () => {
  const app = express();

  // Configura Express para servir archivos estáticos
  app.use(express.static(path.join(__dirname, 'public')));

  // Si deseas servir el archivo 'index.html' directamente cuando se accede a la raíz
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // Configuración de Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }), // Contexto útil si luego usas auth, headers, etc.
  });

  await server.start();

  // Aplica middleware de Apollo Server
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 3000; // Usa el puerto del entorno o el 3000 por defecto

  const httpServer = http.createServer(app);
  httpServer.listen(PORT, () => {
    console.log(`Servidor GraphQL listo en http://localhost:${PORT}/graphql`);
  });
};

startServer();