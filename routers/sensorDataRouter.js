// src/routes/sensorDataRouter.js

import express from 'express';
import Sensor from '../models/Sensor.js';
import BaselineData from '../models/BaselineData.js';
import ImmovableSpace from '../models/ImmovableSpace.js'; // Make sure this import is correct
import arrayManager from '../data/arrayManager.js';

const router = express.Router();

router.post("/", async (req, res) => {
    const {
        name,
        surfaceTempReading,
        ambientTempReading,
        humidityReading,
        gasReading,
        immovableSpaceName,
    } = req.body;

    if (!name || !immovableSpaceName) {
        return res.status(400).json({ message: "Name, SKU, and immovable space name must be provided." });
    }

    try {
        // Check if immovable space exists
        const immovableSpace = await ImmovableSpace.findOne({ name: immovableSpaceName });
        if (!immovableSpace) {
            return res.status(404).json({ message: "Immovable space with the provided name does not exist." });
        }

        const sku = immovableSpace.sku;

        // Check if baseline data exists
        const baseline = await BaselineData.findOne({ sku });
        if (!baseline) {
            return res.status(404).json({ message: "No baseline data found for the given SKU." });
        }


        // Check if sensor exists
        let sensor = await Sensor.findOne({ name });

        if (sensor) {
            // Update existing sensor but do not change isCalibrated
            const updateData = {
                surfaceTempReading: surfaceTempReading || baseline.baselineSurfaceTemp,
                ambientTempReading: ambientTempReading || baseline.baselineAmbientTemp,
                humidityReading: humidityReading || baseline.baselineHumidity,
                gasReading: gasReading || baseline.baselineGas,
            };
            await Sensor.updateOne({ name }, { $set: updateData });
            res.json({ message: "Sensor data updated successfully.", updateData });
        } else {
            // Create a new sensor
            const sensorData = {
                name,
                surfaceTempReading: surfaceTempReading || baseline.baselineSurfaceTemp,
                ambientTempReading: ambientTempReading || baseline.baselineAmbientTemp,
                humidityReading: humidityReading || baseline.baselineHumidity,
                gasReading: gasReading || baseline.baselineGas,
                immovableSpaceName,
                isCalibrated: false // Default value for new sensors
            };
            sensor = new Sensor(sensorData);
            await sensor.save();
            res.status(201).json({ message: "Sensor created successfully.", sensorData });
        }

        // Add or update the gasReading in the array for the given sensor name
        arrayManager.addItem(gasReading || baseline.baselineGas, name);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

export { router as sensorDataRouter };
