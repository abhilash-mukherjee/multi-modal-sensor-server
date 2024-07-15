// src/models/ImmovableSpace.js

import mongoose from 'mongoose';
import Sensor from './Sensor.js';

const ImmovableSpaceSchema = new mongoose.Schema({
    sku: {
        type: String,
        enum: ['BANANA', 'AVOCARDO', 'GUAVA'],
        required: true
    },
    name: { type: String, required: true }
});

const ImmovableSpace = mongoose.model('ImmovableSpace', ImmovableSpaceSchema);

export default ImmovableSpace;
