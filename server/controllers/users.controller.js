const { 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} = require('../db/users.db');

// Get all users
const getUsers = (req, res) => {
  try {
    const users = getAllUsers();
    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID
const getUserProfile = (req, res) => {
  try {
    const { id } = req.params;
    const user = getUserById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user
const updateUserProfile = (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    
    // Prevent updating sensitive fields
    if (userData.password) {
      delete userData.password;
    }
    
    const user = updateUser(id, userData);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ 
      message: 'User updated successfully',
      user 
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user
const deleteUserProfile = (req, res) => {
  try {
    const { id } = req.params;
    const result = deleteUser(id);
    
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile
}; 