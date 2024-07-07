const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const countrySchema = mongoose.Schema(
    {
        end_year: {
          type: String,
        },
        intensity: {
            type: String,
        },
        sector: {
            type: String,
        },
        topic: {
            type: String
        },
        start_year: {
            type: String
        },
        impact: {
            type: String
        },
        added: {
            type: String
        },
        published: {
            type: String
        },
        country: {
            type: String
        },
        relevance: {
            type: String
        },
        pestle: {
            type: String
        },
        source: {
            type: String
        },
        title: {
            type: String
        },
        likelihood: {
            type: String
        }
    },
    { collection: 'country' }
);

countrySchema.plugin(toJSON);

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;