// src/models/BaselineData.js

import mongoose from 'mongoose';

const baselineDataSchema = new mongoose.Schema({
    sku: {
        type: String,
        enum: ['BANANA', 'AVOCARDO', 'GUAVA'],
        required: true
    },
    baselineHumidity: { type: Number, required: true },
    baselineAmbientTemp: { type: Number, required: true },
    baselineSurfaceTemp: { type: Number, required: true },
    baselineGas: { type: Number, required: true }
});

const BaselineData = mongoose.model('BaselineData', baselineDataSchema);

export default BaselineData;
