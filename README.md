📝 Tu-du-lis — Fullstack To-Do App

Tu-du-lis es una aplicación fullstack para la gestión de tareas, construida con React (Vite) en el frontend, FastAPI en el backend y PostgreSQL como base de datos.
El frontend se despliega en Netlify y el backend en Render.

🚀 Tecnologías
Frontend

React + Vite

Fetch API

Netlify (Hosting)

Backend

FastAPI

Uvicorn

PostgreSQL

psycopg2

Render (Hosting)

📦 Estructura del proyecto
Tu_du_lis/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env
│   └── venv/
│
└── frontend/
    ├── src/
    ├── index.html
    ├── vite.config.js
    └── package.json

⚙️ Backend (FastAPI)
▶️ Ejecutar localmente

Crear entorno virtual

python -m venv venv


Activarlo

Windows:

venv\Scripts\activate


Linux/MacOS:

source venv/bin/activate


Instalar dependencias

pip install -r requirements.txt


Crear archivo .env

DATABASE_URL=postgresql://<usuario>:<password>@<host>/<database>


Ejecutar servidor

uvicorn main:app --reload

▶️ Endpoint principal
Método	URL	Descripción
GET	/tasks	Obtener tareas
POST	/tasks	Crear nueva tarea
PUT	/tasks/{id}	Actualizar tarea
DELETE	/tasks/{id}	Eliminar tarea
🌐 Frontend (React)
▶️ Ejecutar localmente

Instalar dependencias:

npm install


Ejecutar servidor de desarrollo:

npm run dev


Ver en el navegador:

http://localhost:5173

▶️ Conexión al backend

Editar la URL del backend en tu frontend:

const API_URL = "https://tu-du-lis.onrender.com";

☁️ Deploy
Backend en Render

Subir backend a GitHub.

Crear un servicio Web Service en Render.

Configurar el Start Command:

uvicorn main:app --host 0.0.0.0 --port $PORT


Añadir variable de entorno:

DATABASE_URL

Frontend en Netlify

Subir frontend a GitHub.

En Netlify seleccionar “Deploy from Git”.

Build command:

npm run build


Public directory:

dist

🗄️ requirements.txt (Cómo actualizarlo)

Cada vez que instales una librería, ejecuta:

pip freeze > requirements.txt


Render usará este archivo para recrear tu entorno.

🧹 .gitignore recomendado
# Python
venv/
__pycache__/
*.pyc
.env

# Node
node_modules/
dist/
.DS_Store

# Logs
*.log

✅ Estado final

✔️ Backend funcionando en Render
✔️ Frontend funcionando en Netlify
✔️ Base de datos conectada
✔️ CORS configurado
✔️ Requests funcionando entre front y back
