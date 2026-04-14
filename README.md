# 🚀 API REST MongoDB + Mongoose

Proyecto backend desarrollado con Node.js, Express y MongoDB (Atlas), que implementa una API REST completa con relaciones entre colecciones.

---

## 📌 Descripción

Esta API permite gestionar:

* 🧩 **Providers (proveedores)**
* 📦 **Products (productos)**

Los productos están relacionados con los proveedores mediante una referencia (`ObjectId`), siguiendo un modelo de datos normalizado.

---

## 🛠️ Tecnologías utilizadas

* ⚡ Node.js
* 🚂 Express
* 🍃 MongoDB Atlas
* 🧬 Mongoose
* 📜 Morgan (logger HTTP)
* ☁️ Render (deploy)

---

## 🧠 Arquitectura del proyecto

El proyecto sigue una estructura modular por capas:

```
📁 config/
📁 controllers/
📁 models/
📁 routes/
📁 services/
📁 middlewares/
📄 server.js
```

### 🔄 Flujo de una petición

Cliente → Ruta → Controller → Modelo → Base de datos → Respuesta

---

## 🔗 Relación entre entidades

* Un **producto** pertenece a un **proveedor**
* Un **proveedor** puede tener varios productos

```txt
Provider 1 ────< Product 1
             └──< Product 2
```

Se utiliza `populate()` de Mongoose para obtener los datos del proveedor dentro de los productos.

---

## ⚙️ Instalación

```bash
git clone https://github.com/TU_USUARIO/ejercicio-api-mongodb-mongoose.git
cd ejercicio-api-mongodb-mongoose
npm install
```

---

## 🔐 Variables de entorno

Crear un archivo `.env`:

```env
PORT=3000
MY_MONGO_URI=tu_uri_de_mongodb_atlas
```

---

## ▶️ Ejecución

```bash
npm run dev
```

---

## 🌐 Endpoints

### 🧩 Providers

| Método | Endpoint       | Descripción          |
| ------ | -------------- | -------------------- |
| GET    | /api/providers | Obtener todos        |
| POST   | /api/providers | Crear proveedor      |
| PUT    | /api/providers | Actualizar proveedor |
| DELETE | /api/providers | Eliminar proveedor   |

---

### 📦 Products

| Método | Endpoint      | Descripción                  |
| ------ | ------------- | ---------------------------- |
| GET    | /api/products | Obtener todos (con populate) |
| POST   | /api/products | Crear producto               |
| PUT    | /api/products | Actualizar producto          |
| DELETE | /api/products | Eliminar producto            |

---

## ⚠️ Reglas de negocio

### 🧩 Providers

* ❌ No se puede eliminar un proveedor si tiene productos asociados
* ✅ Sí se puede eliminar si no tiene productos

### 📦 Products

* ✅ Se pueden eliminar siempre

---

## 🧪 Ejemplo de uso

### Crear proveedor

```json
{
  "company_name": "Nintendo",
  "CIF": "B12345678",
  "address": "Kyoto",
  "url_web": "https://www.nintendo.com"
}
```

---

### Crear producto

```json
{
  "title": "Nintendo Switch",
  "price": 299,
  "description": "Consola híbrida",
  "company_name": "Nintendo"
}
```

---

## 📊 Logging

Se utiliza Morgan para visualizar las peticiones HTTP en consola:

```
GET /api/products 200 8ms
POST /api/providers 201 10ms
```

---

## ☁️ Deploy

* 🔗 Repositorio GitHub: *(añadir enlace)*
* 🌍 API en producción (Render): *(añadir enlace)*

---

## 🎯 Objetivos del proyecto

* Implementar una API REST completa
* Aplicar relaciones entre colecciones en MongoDB
* Utilizar `populate()` en Mongoose
* Gestionar errores y middlewares
* Desplegar en la nube (Render + MongoDB Atlas)

---

## 👨‍💻 Autor

Proyecto desarrollado como ejercicio práctico de backend con MongoDB + Mongoose.

---
