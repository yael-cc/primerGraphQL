require("dotenv").config();

// Importamos el archivo de configuración con las credenciales de Firebase
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

// Importamos el módulo 'firebase-admin' para administrar Firebase desde el servidor
const admin = require("firebase-admin");

let db = null;

function initializeFirebase() {
  if (!admin.apps.length) {
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount), // Autenticamos usando la clave del servicio
    });

    db = admin.firestore();
    console.log('Firebase inicializado correctamente');
  }
}

function getDB() {
  if (!db) {
    throw new Error('Firestore no inicializado');
  }
  return db;
}

module.exports = {initializeFirebase, getDB};