const express = require('express');
const countryController = require('../../controllers/country.controller')
const router = express.Router();


router
     .route('/')
     .get(countryController.getCountries)

     router.get('/filterlist', countryController.getFilterList)

  module.exports = router;