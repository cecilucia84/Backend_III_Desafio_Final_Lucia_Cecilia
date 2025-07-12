# AdoptMe 🐾

**AdoptMe** es una API RESTful desarrollada en **Node.js** con **Express** y **MongoDB**, pensada para la gestión integral de adopciones de mascotas. Incluye administración de usuarios, mascotas y adopciones, documentación Swagger, tests funcionales y está completamente dockerizada para facilitar el despliegue.

---

## 🚀 Características

- **API RESTful** con rutas para usuarios, mascotas y adopciones.
- **Documentación Swagger** para todos los endpoints principales (especialmente Users).
- **Tests funcionales completos** sobre todos los endpoints de adopciones, usuarios y mascotas.
- **Logs profesionales** con Winston y guardado en archivos de logs.
- **Preparada para producción:** Dockerfile listo y despliegue a DockerHub.
- **Imagen Docker pública** para pruebas y producción.

---

## 📋 Tabla de Endpoints Principales

| Método | Ruta                 | Descripción                 |
| ------ | -------------------- | --------------------------- |
| GET    | `/api/users`         | Listar todos los usuarios   |
| GET    | `/api/users/:id`     | Buscar usuario por ID       |
| POST   | `/api/users`         | Crear un usuario            |
| PUT    | `/api/users/:id`     | Modificar usuario           |
| DELETE | `/api/users/:id`     | Eliminar usuario            |
| GET    | `/api/pets`          | Listar todas las mascotas   |
| GET    | `/api/pets/:id`      | Buscar mascota por ID       |
| POST   | `/api/pets`          | Crear mascota               |
| PUT    | `/api/pets/:id`      | Modificar mascota           |
| DELETE | `/api/pets/:id`      | Eliminar mascota            |
| GET    | `/api/adoptions`     | Listar todas las adopciones |
| GET    | `/api/adoptions/:id` | Buscar adopción por ID      |
| POST   | `/api/adoptions`     | Crear una adopción          |
| DELETE | `/api/adoptions/:id` | Eliminar adopción           |

---

## 🧪 Tests

El proyecto cuenta con **tests funcionales** para todos los endpoints, incluyendo:

- **Casos de éxito** (creación, listado, consulta, borrado, modificación).
- **Casos de error** (validación, formato de ID incorrecto, recursos no encontrados, campos obligatorios).

**Para ejecutar los tests:**

```bash
npm install
npm test
```

Los tests se encuentran en la carpeta:

```
src/test/
```

---

## 📦 Docker

### Construir la imagen

```bash
docker build -t cecilucia84/adoptme .
```

### Correr el contenedor

```bash
docker run -p 3000:3000 cecilucia84/adoptme
```

### DockerHub

La imagen pública está disponible en DockerHub:\
👉 [https://hub.docker.com/r/cecilucia84/adoptme](https://hub.docker.com/r/cecilucia84/adoptme)

---

## 📘 Documentación Swagger

La documentación interactiva Swagger está disponible en:

```
http://localhost:3000/api-docs
```

Incluye especificación detallada de los endpoints, parámetros, request/response y ejemplos.

> **Especial mención:** El módulo de `Users` está 100% documentado según la consigna.

---

## ⚙️ Variables de Entorno

El proyecto usa las siguientes variables de entorno (crear un archivo `.env` en la raíz):

```
MONGODB_URI=...           # URI de conexión a MongoDB
MONGODB_NAME=...          # Nombre de la base de datos
PORT=3000                 # Puerto del servidor
```

---

## 🪵 Logs

Los logs del sistema se almacenan en la carpeta `logs/`:

- `combined.log`: logs generales de la aplicación.
- `error.log`: errores detectados durante la ejecución.

> Los logs se generan tanto en consola como en archivos gracias a Winston.

---

## 📁 Estructura del Proyecto

```
src/
├── app.js
├── controllers/
│   ├── users.controller.js
│   ├── pets.controller.js
│   └── adoption.controller.js
├── models/
├── routes/
│   ├── users.router.js
│   ├── pets.router.js
│   └── adoption.router.js
├── utils/
│   └── logger.js
├── test/
│   ├── users.test.js
│   ├── pets.test.js
│   └── adoption.test.js
├── docs/
│   └── swaggerSpec.js
```

---

## 💡 Uso Rápido

1. Clonar el repositorio y ejecutar `npm install`
2. Configurar las variables de entorno (.env)
3. Levantar el servidor:
   - Modo local: `npm start`
   - Modo Docker: usar los comandos de arriba
4. Acceder a la documentación Swagger en [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
5. Ejecutar los tests con `npm test`

---

## ✨ Créditos

Desarrollado por **Cecilia Paola Lucia** para la entrega final de **Backend III**.

