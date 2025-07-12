
# AdoptMe 🐾

AdoptMe es una API desarrollada con Node.js y Express para gestionar adopciones de mascotas, incluyendo rutas para usuarios, mascotas y adopciones.

---

## 🚀 Características Principales

- Documentación Swagger para el módulo de usuarios.
- Tests funcionales para `adoption.router.js`.
- Logs funcionales integrados con Winston.
- Dockerfile listo para producción.
- Imagen Docker subida a DockerHub.

---

## 🧪 Tests

Los tests funcionales se encuentran en `src/test/` y cubren:

- `POST /api/adoptions`
- `GET /api/adoptions`
- `GET /api/adoptions/:id`
- `DELETE /api/adoptions/:id`

Ejecución:

```bash
npm test
```

---

## 📦 Docker

### Construcción de la imagen

```bash
docker build -t cecilucia84/adoptme .
```

### Ejecución del contenedor

```bash
docker run -p 3000:3000 cecilucia84/adoptme
```

### DockerHub

🔗 Imagen pública disponible en DockerHub:

[https://hub.docker.com/r/cecilucia84/adoptme](https://hub.docker.com/r/cecilucia84/adoptme)

---

## 📘 Swagger

La documentación Swagger está disponible accediendo a:

```
http://localhost:3000/api-docs
```

Incluye el módulo completo de `Users`.

---

## 🪵 Logs

Los logs se encuentran en la carpeta `logs/`:

- `combined.log` para logs generales.
- `error.log` para errores.

---

## 📁 Estructura del Proyecto

```
src/
├── app.js
├── routes/
├── controllers/
├── models/
├── utils/logger.js
├── test/
├── docs/swaggerSpec.js
```

---

## ✨ Créditos

Desarrollado por Cecilia Paola Lucia para el curso de Backend III.
