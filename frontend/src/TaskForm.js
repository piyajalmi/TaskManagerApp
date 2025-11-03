import React, { useState } from 'react';
import { createTask } from './api/tasksApi';

export default function TaskForm({ onSaved }) {
  const [form, setForm] = useState({ title:'', description:'', status:'Pending', priority:'Low', due_date:'' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(form);
      setForm({ title:'', description:'', status:'Pending', priority:'Low', due_date:'' });
      if (onSaved) onSaved();
    } catch (err) {
      alert('Error saving');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
  className="Title"
  required
  placeholder="Title"
  value={form.title}
  onChange={e => setForm({ ...form, title: e.target.value })}
/>

      <input placeholder="Due date" type="date" value={form.due_date} onChange={e=>setForm({...form, due_date: e.target.value})}/>
      <select value={form.priority} onChange={e=>setForm({...form, priority: e.target.value})}>
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <select value={form.status} onChange={e=>setForm({...form, status: e.target.value})}>
        <option>Pending</option><option>Done</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}
