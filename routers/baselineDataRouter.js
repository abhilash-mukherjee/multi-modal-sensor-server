// src/routes/baselineDataRouter.js

import express from 'express';
import BaselineData from '../models/BaselineData.js';

export const baselineDataRouter = express.Router();

baselineDataRouter.post("/", async (req, res) => {
    const { sku, baselineHumidity, baselineAmbientTemp, baselineSurfaceTemp, baselineGas } = req.body;

    // Validate all fields are provided
    if (!sku || baselineHumidity === undefined || baselineAmbientTemp === undefined || 
        baselineSurfaceTemp === undefined || baselineGas === undefined) {
        return res.status(400).json({ message: "All fields must be provided and must be numbers where required." });
    }

    // Check if all numeric fields are indeed numbers
    if (isNaN(baselineHumidity) || isNaN(baselineAmbientTemp) || 
        isNaN(baselineSurfaceTemp) || isNaN(baselineGas)) {
        return res.status(400).json({ message: "All baseline data must be valid numbers." });
    }

    try {
        let baseline = await BaselineData.findOne({ sku });

        if (baseline) {
            // If exists, update the baseline data
            baseline.baselineHumidity = baselineHumidity;
            baseline.baselineAmbientTemp = baselineAmbientTemp;
            baseline.baselineSurfaceTemp = baselineSurfaceTemp;
            baseline.baselineGas = baselineGas;
            await baseline.save();
            res.json({ message: "Baseline data updated successfully", baseline });
        } else {
            // If it does not exist, create a new BaselineData entry
            const newBaseline = new BaselineData({
                sku,
                baselineHumidity,
                baselineAmbientTemp,
                baselineSurfaceTemp,
                baselineGas
            });
            await newBaseline.save();
            res.status(201).json({ message: "Baseline data created successfully", newBaseline });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
