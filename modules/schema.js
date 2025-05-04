const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');

// Carga los archivos
const typesArray = loadFilesSync(path.join(__dirname, '**/*.typeDefs.js'));
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

// VERIFICACIÓN: imprime cuántos se detectan
console.log('TypeDefs encontrados:', typesArray.length);
console.log('Resolvers encontrados:', resolversArray.length);

// Fusiona
const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolversArray);

module.exports = { typeDefs, resolvers };