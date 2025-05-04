const { getDB } = require('../../config/config.js');

const resolvers = {
  Query: {
    getTasks: async () => {
      const db = getDB();
      const snapshot = await db.collection('tasks').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    getTask: async (_, { id }) => {
      const db = getDB();
      const doc = await db.collection('tasks').doc(id).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() };
    },
  },

  Mutation: {
    createTask: async (_, { title, description, completed }) => {
      const db = getDB();
      const newTask = { title, description, completed };
      const docRef = await db.collection('tasks').add(newTask);
      return { id: docRef.id, ...newTask };
    },

    updateTask: async (_, { id, title, description, completed }) => {
      const db = getDB();
      const updates = {};
      if (title !== undefined) updates.title = title;
      if (description !== undefined) updates.description = description;
      if (completed !== undefined) updates.completed = completed;

      await db.collection('tasks').doc(id).update(updates);
      const updatedDoc = await db.collection('tasks').doc(id).get();
      return { id: updatedDoc.id, ...updatedDoc.data() };
    },

    deleteTask: async (_, { id }) => {
      const db = getDB();
      await db.collection('tasks').doc(id).delete();
      return true;
    },
  },
};

module.exports = { resolvers };