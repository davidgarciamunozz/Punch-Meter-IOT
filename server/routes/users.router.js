const express = require('express');
const { 
  getUsers, 
  getUserProfile, 
  updateUserProfile, 
  deleteUserProfile 
} = require('../controllers/users.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/', getUsers);
router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);
router.delete('/:id', deleteUserProfile);

module.exports = router; 