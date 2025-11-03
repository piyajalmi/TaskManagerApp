const db = require('../db');

const { validationResult } = require('express-validator');

// ✅ Create a new task
exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, description, status, priority, due_date } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO tasks (title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?)',
      [title, description, status || 'Pending', priority || 'Medium', due_date || null]
    );
    res.status(201).json({ id: result.insertId, message: 'Task created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
};

// ✅ Get all tasks (with filters, pagination, sorting)
exports.getTasks = async (req, res) => {
  try {
    let query = 'SELECT * FROM tasks WHERE 1=1';
    const params = [];

    if (req.query.status) {
      query += ' AND status = ?';
      params.push(req.query.status);
    }

    if (req.query.priority) {
      query += ' AND priority = ?';
      params.push(req.query.priority);
    }

    if (req.query.sortBy) {
      query += ` ORDER BY ${req.query.sortBy} ${req.query.order === 'desc' ? 'DESC' : 'ASC'}`;
    }

    if (req.query.limit && req.query.page) {
      const limit = parseInt(req.query.limit);
      const offset = (parseInt(req.query.page) - 1) * limit;
      query += ` LIMIT ${limit} OFFSET ${offset}`;
    }

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};

// ✅ Get single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Task not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching task', error: err.message });
  }
};

// ✅ Update task
exports.updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, description, status, priority, due_date } = req.body;
  try {
    await db.query(
      'UPDATE tasks SET title=?, description=?, status=?, priority=?, due_date=? WHERE id=?',
      [title, description, status, priority, due_date, req.params.id]
    );
    res.json({ message: 'Task updated successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
};

// ✅ Delete task
exports.deleteTask = async (req, res) => {
  try {
    await db.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    res.json({ message: 'Task deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
};
