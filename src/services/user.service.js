const User = require('../models/User');

const findAll = async (query = {}) => {
  const users = await User.find(query).populate('pets').lean();
  return users;
};

const findById = async (id) => {
  const user = await User.findById(id).populate('pets').lean();
  return user;
};

const create = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const createMany = async (usersData) => {
  return await User.insertMany(usersData);
};

module.exports = {
  findAll,
  findById,
  create,
  createMany,
};
