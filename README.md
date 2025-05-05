
# CRUD de Tareas con GraphQL

Este proyecto implementa una aplicación básica para gestionar tareas utilizando GraphQL. Se incluyen las operaciones de crear, leer, actualizar y eliminar tareas (CRUD), y se proporciona una interfaz frontend simple en HTML y JavaScript puro para probar las funcionalidades expuestas por el servidor GraphQL.

## Tecnologías utilizadas

- Node.js
- Apollo Server
- GraphQL
- Firebase (como base de datos)
- HTML, CSS y JavaScript (para el frontend)

## Funcionalidades

- Obtener todas las tareas
- Buscar tarea por ID
- Crear nueva tarea
- Editar tarea existente
- Eliminar tarea

## Objetivo del proyecto

Este proyecto se realizó con el objetivo de poner en práctica el uso de GraphQL como alternativa a las API REST tradicionales. Se busca aprovechar su flexibilidad para definir y consultar datos, así como su eficiencia para minimizar el tráfico innecesario entre cliente y servidor.

## Ejemplo de consulta

```graphql
query {
  getTasks {
    id
    title
    description
    completed
  }
}
```

## Autor
- Nombre: Luis Angel Yael Cuevas Cruz
- Contacto: luancuevascr@ittepic.edu.mx
- Proyecto para: Desarrollo de Servicios Web