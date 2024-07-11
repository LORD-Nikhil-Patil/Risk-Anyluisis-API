const httpStatus = require('http-status');
const { Country } = require('../models');
const ApiError = require('../utils/ApiError');


const startYear = 2015;
const endYear = 2040;

const updateEndYears = async () => {
  try {
    const countries = await Country.find({ end_year: null })
    for (const doc of countries) {
      const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
      doc.end_year = randomYear.toString();
      await doc.save();
    }
    console.log('End years updated successfully');
  } catch (error) {
    console.error('Error updating end years:', error);
  }
};

updateEndYears();

const getCountries = async (filter = {}, options = {}) => {

  if (filter.end_year) {
    filter.end_year = { $lte: filter.end_year };  // Modify filter to include <= condition
  }

  const countries = await Country.find(filter, null, options);
  for (const doc of countries) {
    if (doc.endYear === null) {
      const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
      doc.end_year = randomYear.toString();
    }
  }
  if (!countries) {
    throw new ApiError(httpStatus.NOT_FOUND, 'countries not found');
  }
  return countries;
};



const getFilterList = async (item) => {
  const result = await Country.distinct(item)
  return result;
}

const getAllFilterList = async () => {
  const topicConst = "topic";
  const end_yearConst = "end_year";
  const start_yearConst = "start_year"
  const regionConst = "region";
  const countryConst = "country";
  const pestleConst = "pestle";
  const sectorConst = "sector";
  const cityConst = "city";

  const topic = await getFilterList(topicConst);
  const end_year = await getFilterList(end_yearConst);
  const region = await getFilterList(regionConst);
  const country = await getFilterList(countryConst);
  const pestle = await getFilterList(pestleConst);
  const sector = await getFilterList(sectorConst);
  const city = await getFilterList(cityConst);
  const start_year = await getFilterList(start_yearConst)
  return {
    topic,
    end_year,
    region,
    country,
    pestle,
    sector,
    city,
    start_year
  };
}


module.exports = {
  getCountries,
  getAllFilterList
};