# 📝 PROYECTO FORMATIVO – TU‑DU‑LIS

## PROCESO DE GESTIÓN DE FORMACIÓN PROFESIONAL INTEGRAL

---

## 1. Información General

**Nombre del proyecto:** Tu‑du‑lis – Aplicación Fullstack de Gestión de Tareas (To‑Do List)  
**Programa de formación:** Análisis y Desarrollo de Software  
**Tipo de proyecto:** Proyecto formativo – Evidencia técnica  
**Aprendiz:** Andrés Felipe Guio Aponte  
**Repositorio GitHub:** https://github.com/Guio3141592653589793238462643383  
**Licencia:** Uso libre con fines educativos

---

## 2. Descripción del Proyecto

**Tu‑du‑lis** es una aplicación **fullstack** para la gestión de tareas (To‑Do List), desarrollada con tecnologías modernas de desarrollo web. El proyecto permite crear, listar, actualizar y eliminar tareas mediante una interfaz gráfica en React y un backend en FastAPI conectado a una base de datos PostgreSQL.

El objetivo del proyecto es aplicar los conocimientos adquiridos en desarrollo frontend, backend, consumo de APIs REST, manejo de bases de datos y despliegue en la nube.

---

## 3. Tecnologías Utilizadas

### Frontend
- React
- Vite
- JavaScript (JSX)
- Fetch API

### Backend
- FastAPI
- Python
- Uvicorn
- PostgreSQL
- psycopg2

### Herramientas adicionales
- Git y GitHub
- Netlify (despliegue frontend)
- Render (despliegue backend)
- Visual Studio Code

---

## 4. Estructura del Proyecto

La estructura real del proyecto es la siguiente:

```
TU_DU_LIS/
│
├── .vscode/
│   └── settings.json
│
├── __pycache__/
├── venv/
├── .env
├── main.py
├── requirements.txt
│
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

## 5. Backend – FastAPI

El backend está desarrollado en **FastAPI** y se encuentra en el archivo `main.py` ubicado en la raíz del proyecto.

### Ejecución local del backend

1. Crear el entorno virtual:

```bash
python -m venv venv
```

2. Activar el entorno virtual:

**Windows**
```bash
venv\Scripts\activate
```

**Linux / MacOS**
```bash
source venv/bin/activate
```

3. Instalar dependencias:

```bash
pip install -r requirements.txt
```

4. Crear el archivo `.env` con la cadena de conexión a la base de datos:

```env
DATABASE_URL=postgresql://usuario:password@host:puerto/nombre_db
```

5. Ejecutar el servidor:

```bash
uvicorn main:app --reload
```

El backend se ejecuta en:

```
http://localhost:8000
```

---

### Endpoints disponibles

| Método | Endpoint | Descripción |
|------|----------|-------------|
| GET | /tasks | Obtener todas las tareas |
| POST | /tasks | Crear una nueva tarea |
| PUT | /tasks/{id} | Actualizar una tarea |
| DELETE | /tasks/{id} | Eliminar una tarea |

---

## 6. Frontend – React + Vite

### Ejecución local del frontend

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

3. Abrir en el navegador:

```
http://localhost:5173
```

---

### Conexión Frontend – Backend

La URL del backend se configura directamente en el código del frontend, por ejemplo:

```js
const API_URL = "http://localhost:8000";
```

En producción:

```js
const API_URL = "https://tu-du-lis.onrender.com";
```

---

## 7. Despliegue del Proyecto

### Backend
- Desplegado en **Render**
- Comando de inicio:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

- Variable de entorno configurada:

```
DATABASE_URL
```

### Frontend
- Desplegado en **Netlify**
- Build command: `npm run build`
- Publish directory: `dist`

---

## 8. Control de Versiones

El proyecto utiliza **Git** para el control de versiones y se encuentra alojado en **GitHub**, permitiendo el seguimiento de cambios y la colaboración.

---

## 9. Estado Final del Proyecto

✔ Backend operativo y conectado a PostgreSQL  
✔ Frontend funcional en React + Vite  
✔ Comunicación correcta entre frontend y backend  
✔ Proyecto desplegado en la nube  
✔ Cumple con los objetivos del proyecto formativo

---

## 10. Licencia

Este proyecto es de **uso libre**, con fines educativos. Puede ser utilizado, modificado y adaptado sin restricciones para el aprendizaje y la formación.

