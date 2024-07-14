// src/routes/calibrationRouter.js

import express from 'express';
import Sensor from '../models/Sensor.js';
import ImmovableSpace from '../models/ImmovableSpace.js';
import arrayManager from '../data/arrayManager.js';

const router = express.Router();

router.post("/:immovableSpaceName", async (req, res) => {
    const { immovableSpaceName } = req.params;

    try {
        // Check if immovable space exists
        const immovableSpace = await ImmovableSpace.findOne({ name: immovableSpaceName });
        if (!immovableSpace) {
            return res.status(404).json({ message: "Immovable space not found." });
        }

        // Find the sensor linked to this immovable space
        const sensor = await Sensor.findOne({ immovableSpaceName: immovableSpaceName });
        if (!sensor) {
            return res.status(404).json({ message: "Sensor not found for the given immovable space." });
        }

        // Ensure the array for the sensor is full before calibration
        if (!arrayManager.isFull(sensor.name)) {
            return res.status(400).json({ message: "Insufficient data for calibration. The data array is not full." });
        }

        // Calculate the mean of the data array corresponding to this sensor
        const meanValue = arrayManager.mean(sensor.name);
        if (meanValue === 0) {
            return res.status(404).json({ message: "No data available for calibration." });
        }

        // Update sensor with the mean value as calibration factor and set isCalibrated to true
        sensor.calibrationFactor = parseInt(meanValue);
        sensor.isCalibrated = true;
        sensor.lastCalibrated = new Date();
        await sensor.save();

        res.json({
            message: "Sensor calibration successful.",
            sensorName: sensor.name,
            calibrationFactor: sensor.calibrationFactor,
            isCalibrated: sensor.isCalibrated
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

export { router as calibrationRouter };
