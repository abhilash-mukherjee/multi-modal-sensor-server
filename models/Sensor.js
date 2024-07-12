// src/models/Sensor.js

import mongoose from 'mongoose';

const SensorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surfaceTempReading: { type: Number, required: true },
    ambientTempReading: { type: Number, required: true },
    humidityReading: { type: Number, required: true },
    gasReading: { type: Number, required: true },
    immovableSpaceName: { type: String },
    isCalibrated: { type: Boolean, required: true, default: false},
    calibrationFactor: {type: Number}
});

const Sensor = mongoose.model('Sensor', SensorSchema);

export default Sensor;
