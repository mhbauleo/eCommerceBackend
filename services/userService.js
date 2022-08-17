const { User } = require("../daos/index");

const getById = async (id) => {
  return await User.getById(id);
};

const getUserByEmail = async (email) => {
  return await User.getUserByEmail(email);
};

const saveAndGetUser = async (newUser) => {
  return await User.saveAndGetUser(newUser);
};

module.exports = { getById, getUserByEmail, saveAndGetUser };
