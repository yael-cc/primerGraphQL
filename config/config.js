// Cargamos las variables de entorno definidas en un archivo .env
require("dotenv").config();

// Parseamos las credenciales de Firebase que están guardadas como string JSON en una variable de entorno
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

// Importamos el SDK de administración de Firebase, que nos permite interactuar con servicios como Firestore desde el backend
const admin = require("firebase-admin");

// Variable que contendrá la instancia de la base de datos Firestore una vez inicializada
let db = null;

/**
 * Inicializa la aplicación de Firebase si no ha sido inicializada previamente.
 * Esto se asegura de que la configuración se haga una sola vez durante el ciclo de vida del servidor.
 */
function initializeFirebase() {
  // admin.apps es un arreglo que contiene las apps inicializadas; si está vacío, aún no se ha inicializado
  if (!admin.apps.length) {
    admin.initializeApp({
      // Se utiliza la autenticación basada en un archivo de clave privada
      credential: admin.credential.cert(serviceAccount),
    });

    // Inicializamos la instancia de Firestore y la guardamos en la variable 'db'
    db = admin.firestore();

    console.log('Firebase inicializado correctamente');
  }
}

/**
 * Devuelve la instancia actual de la base de datos Firestore.
 * Lanza un error si se intenta acceder antes de haber inicializado Firebase.
 */
function getDB() {
  if (!db) {
    throw new Error('Firestore no inicializado');
  }
  return db;
}

// Exportamos las funciones para que puedan ser utilizadas en otras partes del proyecto
module.exports = { initializeFirebase, getDB };