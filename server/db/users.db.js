const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, 'users.json');

// Read users from JSON file
const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return { users: [] };
  }
};

// Write users to JSON file
const writeUsers = (data) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing users file:', error);
    return false;
  }
};

// Get all users
const getAllUsers = () => {
  const data = readUsers();
  return data.users;
};

// Get a user by email
const getUserByEmail = (email) => {
  const data = readUsers();
  return data.users.find(user => user.email === email) || null;
};

// Get a user by ID
const getUserById = (id) => {
  const data = readUsers();
  return data.users.find(user => user.id === id) || null;
};

// Create a new user
const createUser = (userData) => {
  const data = readUsers();
  const newUser = {
    id: Date.now().toString(),
    username: userData.username,
    email: userData.email,
    password: userData.password,
    createdAt: new Date().toISOString()
  };
  
  data.users.push(newUser);
  
  if (writeUsers(data)) {
    // Return a clean user object without the password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
  return null;
};

// Update a user
const updateUser = (id, userData) => {
  const data = readUsers();
  const index = data.users.findIndex(user => user.id === id);
  
  if (index === -1) return null;
  
  const updatedUser = {
    ...data.users[index],
    ...userData,
    updatedAt: new Date().toISOString()
  };
  
  data.users[index] = updatedUser;
  
  if (writeUsers(data)) {
    // Return a clean user object without the password
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
  return null;
};

// Delete a user
const deleteUser = (id) => {
  const data = readUsers();
  const index = data.users.findIndex(user => user.id === id);
  
  if (index === -1) return false;
  
  data.users.splice(index, 1);
  return writeUsers(data);
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}; 