const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { countryService } = require('../services');

const getCountries = catchAsync(async (req, res) => {
    const result = await countryService.getCountries(req.query)
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'countries not found');
    }
    res.send(result);
});

const getFilterList = catchAsync(async (req, res) => {
    const topics = await countryService.getAllFilterList();
    res.send(topics);
});


 
module.exports = {
    getCountries,
    getFilterList
};
