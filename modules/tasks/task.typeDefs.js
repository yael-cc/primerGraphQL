// Importamos la función gql de apollo-server-express para definir el esquema con template literals
const { gql } = require('apollo-server-express');

// Definimos el esquema GraphQL usando la sintaxis del lenguaje de esquemas (SDL)
const typeDefs = gql`

  # Definición del tipo 'Task', que representa una tarea en el sistema
  type Task {
    id: ID!                 # Identificador único, no nulo
    title: String!          # Título obligatorio de la tarea
    description: String     # Descripción opcional
    completed: Boolean!     # Estado de finalización (true o false), obligatorio
  }

  # Definición de las operaciones disponibles para consultar datos (queries)
  type Query {
    getTasks: [Task!]!      # Devuelve una lista de tareas, nunca nula
    getTask(id: ID!): Task  # Devuelve una tarea específica por su ID
  }

  # Definición de las operaciones disponibles para modificar datos (mutations)
  type Mutation {
    # Crea una nueva tarea y devuelve el objeto creado
    createTask(title: String!, description: String, completed: Boolean!): Task!

    # Actualiza una tarea existente y devuelve el objeto actualizado
    updateTask(id: ID!, title: String, description: String, completed: Boolean): Task!

    # Elimina una tarea por su ID, devuelve true si se eliminó correctamente
    deleteTask(id: ID!): Boolean!
  }
`;

// Exportamos los typeDefs para que puedan ser usados al inicializar Apollo Server
module.exports = { typeDefs };