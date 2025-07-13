# AdoptMe API 🐾

Proyecto final de backend para gestión de adopciones de mascotas. Dockerizado, testeado y documentado.

---

## 🧰 Tecnologías utilizadas

- Node.js + Express
- MongoDB + Mongoose
- Swagger (OpenAPI 3.0)
- Mocha + Chai + Supertest
- Docker + Render para despliegue
- Winston para logging

---

## 🧪 Tests

### Pruebas funcionales (rutas)

- Ubicación: `src/test/routes`
- Endpoints testeados: `/api/users`, `/api/pets`, `/api/adoptions`
- Librerías: `mocha`, `chai`, `supertest`

### Pruebas unitarias (servicios)

- Ubicación: `src/test/unit`
- Servicios testeados:
  - `PetService` (`pet.service.test.js`)
  - `AdoptionService` (`adoption.service.test.js`)
  - `UserService` (`users.service.test.js`)
- Librerías: `mocha`, `chai`, `sinon`

### Ejecutar todos los tests:

```bash
npm test
```

---

## 📘 Documentación de la API

Documentación Swagger disponible en:

👉 [http://localhost:3000/docs/](http://localhost:3000/docs/)

Incluye:

- Especificación OpenAPI 3.0
- Información de contacto y licencia
- Todos los endpoints (`/api/users`, `/api/pets`, `/api/adoptions`...)

---

## 🚀 Cómo ejecutar el proyecto

### Desarrollo local

```bash
npm install
npm start
```

## 🐳 Docker

### Crear imagen local

```bash
docker build -t adoptme-api .
```

### Ejecutar contenedor

```bash
docker run -p 3000:3000 --env-file .env adoptme-api
```

---

## ☁️ Imagen en DockerHub

🔗 Imagen disponible públicamente en DockerHub:  
👉 [https://hub.docker.com/r/cecilucia84/adoptme](https://hub.docker.com/r/cecilucia84/adoptme)

---

## 👩‍💻 Realizado por:

**Cecilia Paola Lucia**