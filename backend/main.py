from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
import os
from dotenv import load_dotenv
from typing import List, Optional

# Cargar variables de entorno
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Inicializar FastAPI
app = FastAPI()

# Habilitar CORS para React (localhost:3000)
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conexión a PostgreSQL
def get_connection():
    return psycopg2.connect(DATABASE_URL)

# Modelo de tarea
class Task(BaseModel):
    id: Optional[int] = None
    team_member_name: str
    team_member_avatar: str
    task_name: str
    priority: str

# -----------------------------
# Endpoints
# -----------------------------

# Obtener todas las tareas
@app.get("/tasks", response_model=List[Task])
def get_tasks():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT id, team_member_name, team_member_avatar, task_name, priority
        FROM tasks
        ORDER BY id ASC
    """)
    rows = cur.fetchall()
    cur.close()
    conn.close()
    tasks = [Task(id=r[0], team_member_name=r[1], team_member_avatar=r[2], task_name=r[3], priority=r[4]) for r in rows]
    return tasks

# Crear tarea
@app.post("/tasks", response_model=Task)
def create_task(task: Task):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        """
        INSERT INTO tasks (team_member_name, team_member_avatar, task_name, priority)
        VALUES (%s, %s, %s, %s) RETURNING id
        """,
        (task.team_member_name, task.team_member_avatar, task.task_name, task.priority)
    )
    task_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    task.id = task_id
    return task

# Actualizar tarea
@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task: Task):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        """
        UPDATE tasks
        SET task_name = %s, priority = %s
        WHERE id = %s
        RETURNING id, team_member_name, team_member_avatar, task_name, priority
        """,
        (task.task_name, task.priority, task_id)
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Task not found")
    return Task(id=row[0], team_member_name=row[1], team_member_avatar=row[2], task_name=row[3], priority=row[4])

# Eliminar tarea
@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: int):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM tasks WHERE id = %s RETURNING id", (task_id,))
    deleted = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    if not deleted:
        raise HTTPException(status_code=404, detail="Task not found")
