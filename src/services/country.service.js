const httpStatus = require('http-status');
const { Country } = require('../models');
const ApiError = require('../utils/ApiError');

const getCountries = async (filter = {topic: "fossil fuel"}, options = {}) => {
  const countries = await Country.find(filter, null, options);
  if (!countries) {
    throw new ApiError(httpStatus.NOT_FOUND, 'countries not found');
  }
  return countries;
};

const getFilterList = async (item) => {
  const result = await Country.distinct(item)
  return result;
}



module.exports = {
  getCountries,
  getFilterList
};