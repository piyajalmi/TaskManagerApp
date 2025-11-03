const express = require('express');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');
const controller = require('../controllers/tasksController');

// Create
router.post('/',
  [
    body('title').isLength({ min: 1 }).withMessage('Title required'),
    body('status').optional().isIn(['Pending','Done']),
    body('priority').optional().isIn(['Low','Medium','High']),
    body('due_date').optional().isISO8601().toDate()
  ],
  controller.createTask
);

// Read list with filtering, sorting, pagination
router.get('/',
  [
    query('page').optional().isInt({ gt: 0 }).toInt(),
    query('limit').optional().isInt({ gt: 0 }).toInt(),
    query('status').optional().isIn(['Pending','Done']),
    query('priority').optional().isIn(['Low','Medium','High']),
    query('sortBy').optional().isIn(['title','due_date','priority','created_at','status']),
    query('order').optional().isIn(['asc','desc'])
  ],
  controller.getTasks
);

// Read single
router.get('/:id', controller.getTaskById);

// Update
router.put('/:id',
  [
    body('title').optional().isLength({ min: 1 }),
    body('status').optional().isIn(['Pending','Done']),
    body('priority').optional().isIn(['Low','Medium','High']),
    body('due_date').optional().isISO8601().toDate()
  ],
  controller.updateTask
);

// Delete
router.delete('/:id', controller.deleteTask);

module.exports = router;
