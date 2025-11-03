CREATE DATABASE task_tracker;
USE task_tracker;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('Pending', 'Done') DEFAULT 'Pending',
  priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
