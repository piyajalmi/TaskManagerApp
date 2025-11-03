const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./routes/task');
const dotenv = require('dotenv');
const db = require('./db');



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
