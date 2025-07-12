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
docker run -p 3000:3000 -e MONGODB_URI="TU_URI_DE_MONGO" -e PORT=3000 cecilucia84/adoptme
```

> Reemplazá `TU_URI_DE_MONGO` por tu cadena de conexión real a MongoDB.

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

## 🧑‍💻 Cómo probar la API desde Swagger

La interfaz Swagger te permite **probar todos los endpoints** directamente desde el navegador, sin necesidad de Postman o curl. Seguí estos pasos:

### 1. Accedé a la documentación

Ingresá a [http://localhost:3000/api-docs](http://localhost:3000/api-docs)\
Vas a ver una lista de todas las rutas agrupadas por recurso: Users, Pets y Adoptions.

---

### 2. Crear recursos (POST)

**Ejemplo:** Para crear un usuario, expandí `POST /api/users` y presioná “Try it out”.

- En el “Request body” completá:

```json
{
  "name": "Juan Perez",
  "email": "juanperez+test@adoptme.com",
  "password": "test1234"
}
```

- Presioná **Execute**.
- Copiá el valor del campo `_id` que aparece en la respuesta. Ese será el ID de tu nuevo usuario.

Hacé lo mismo para crear mascotas (`POST /api/pets`) y adopciones (`POST /api/adoptions`). Siempre copiá los IDs que obtengas.

---

### 3. Consultar recursos por ID (GET / PUT / DELETE)

Usá el ID copiado en el campo correspondiente al probar endpoints por ID:

- **GET /api/users/{id}**
- **PUT /api/users/{id}**
- **DELETE /api/users/{id}**
- **GET /api/pets/{id}**, etc.

**Ejemplo:**\
Si el ID de usuario es `60f1e8f6c2a4f23a4c6a8b12`, en Swagger colocá ese valor en el campo `{id}` al probar la ruta, y luego apretá **Execute**.

---

### 4. Ejemplo completo de flujo:

1. **Crear un usuario** → copiar el ID.
2. **Crear una mascota** → copiar el ID.
3. **Crear una adopción** usando los IDs anteriores.
4. **Consultar, editar o eliminar** cualquiera de los recursos usando el ID correspondiente.

---

### 5. Pruebas de error

- Probá enviar campos vacíos o IDs inválidos para ver las respuestas de error y comprobar la robustez de la API.
- Los mensajes de error aparecen en el “Response body”.

---

## ✨ Créditos

Desarrollado por **Cecilia Paola Lucia** para la entrega final de **Backend III**.

