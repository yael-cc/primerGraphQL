// modules/tasks/task.model.js
const { getDB } = require('../../config/config'); // Usa getDB en lugar de acceder directo a db

function getTaskCollection() {
  const db = getDB(); // Esto lanza error si no fue inicializado, lo cual es bueno
  return db.collection('tasks');
}

module.exports = { getTaskCollection };