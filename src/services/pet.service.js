const Pet = require('../models/Pet');

const findAll = async (query = {}) => {
  const pets = await Pet.find(query).lean();
  return pets;
};

const findById = async (id) => {
  const pet = await Pet.findById(id).lean();
  return pet;
};

const create = async (petData) => {
  const pet = new Pet(petData);
  return await pet.save();
};

const createMany = async (petsData) => {
  return await Pet.insertMany(petsData);
};

module.exports = {
  findAll,
  findById,
  create,
  createMany,
};
