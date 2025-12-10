import React, { useState, useEffect } from 'react';
import { Trash2, Edit2 } from 'lucide-react';

const API_URL = "http://127.0.0.1:8000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = async (task) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTask = async (id, updates) => {
    const taskToUpdate = tasks.find(t => t.id === id);
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...taskToUpdate, ...updates }),
    });
    const updatedTask = await res.json();
    setTasks(tasks.map(t => t.id === id ? updatedTask : t));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Tasque Manager</h1>
            <p className="text-white/80">Organiza y gestiona tus tareas</p>
          </div>
          <AddTask onAdd={addTask} />
          <TaskList tasks={tasks} onDeleteTask={deleteTask} onUpdateTask={updateTask} />
        </div>
      </div>
    </div>
  );
}

function AddTask({ onAdd }) {
  const [taskName, setTaskName] = useState('');
  const [teamMember, setTeamMember] = useState('');
  const [priority, setPriority] = useState('Middle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim() || !teamMember.trim()) return;
    onAdd({
      team_member_name: teamMember,
      team_member_avatar: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp',
      task_name: taskName,
      priority
    });
    setTaskName('');
    setTeamMember('');
    setPriority('Middle');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6 border border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input type="text" placeholder="Nombre del miembro" value={teamMember}
          onChange={(e) => setTeamMember(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition" />
        <input type="text" placeholder="Nombre de la tarea" value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition" />
      </div>
      <div className="flex gap-4">
        <select value={priority} onChange={(e) => setPriority(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition">
          <option value="High" className="text-gray-800">Alta prioridad</option>
          <option value="Middle" className="text-gray-800">Media prioridad</option>
          <option value="Low" className="text-gray-800">Baja prioridad</option>
        </select>
        <button type="submit"
          className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-white/90 transition transform hover:scale-105 active:scale-95 shadow-lg">
          Agregar Tarea
        </button>
      </div>
    </form>
  );
}

function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div className="text-center py-12 text-white/60">
          <p className="text-lg">No hay tareas. ¡Agrega una para comenzar!</p>
        </div>
      ) : tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDeleteTask={() => onDeleteTask(task.id)} onUpdateTask={(updates) => onUpdateTask(task.id, updates)} />
      ))}
    </div>
  );
}

function TaskItem({ task, onDeleteTask, onUpdateTask }) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(task.task_name);

  const priorityStyles = { High: 'bg-red-500 text-white', Middle: 'bg-yellow-500 text-gray-900', Low: 'bg-green-500 text-white' };

  const saveEdit = () => {
    const cleanText = newText.trim();
    if (cleanText && cleanText !== task.task_name) onUpdateTask({ task_name: cleanText });
    setEditing(false);
  };

  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20 transition-all hover:bg-white/15">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <img src={task.team_member_avatar} alt={task.team_member_name} className="w-10 h-10 rounded-full border-2 border-white/30" />
          <div className="min-w-0 flex-1">
            <p className="text-white/80 text-sm">{task.team_member_name}</p>
            {editing ? (
              <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)}
                onBlur={saveEdit} onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') { setNewText(task.task_name); setEditing(false); } }}
                className="w-full px-2 py-1 bg-white/20 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-white/50" autoFocus />
            ) : (
              <p className="text-white font-medium truncate" onDoubleClick={() => setEditing(true)} style={{ cursor: 'pointer' }} title="Doble click para editar">
                {task.task_name}
              </p>
            )}
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${priorityStyles[task.priority]}`}>
          {task.priority === 'High' ? 'Alta' : task.priority === 'Middle' ? 'Media' : 'Baja'}
        </span>
        <div className="flex gap-2">
          <button onClick={() => setEditing(!editing)} className="p-2 text-blue-300 hover:text-blue-200 hover:bg-white/10 rounded-lg transition" title="Editar"><Edit2 className="w-4 h-4" /></button>
          <button onClick={onDeleteTask} className="p-2 text-red-300 hover:text-red-200 hover:bg-white/10 rounded-lg transition" title="Eliminar"><Trash2 className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
}

export default App;
