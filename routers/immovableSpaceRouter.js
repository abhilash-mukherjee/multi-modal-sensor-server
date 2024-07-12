// src/routers/immovableSpaceRouter.js

import express from 'express';
import ImmovableSpace from '../models/ImmovableSpace.js';

export const immovableSpaceRouter = express.Router();

// POST method to create a new ImmovableSpace
immovableSpaceRouter.post("/", async (req, res) => {
    const { name, sku } = req.body;

    // Validate the input
    if (!name || !sku) {
        return res.status(400).json({ message: "Both name and SKU must be provided." });
    }

    // Validate SKU against the enum
    const validSKUs = ['BANANA', 'AVOCARDO'];
    if (!validSKUs.includes(sku)) {
        return res.status(400).json({ message: "Invalid SKU provided." });
    }

    try {
        // Check if an ImmovableSpace with the given name exists
        let immovableSpace = await ImmovableSpace.findOne({ name });

        if (immovableSpace) {
            // If it exists, update the SKU
            immovableSpace.sku = sku;
            await immovableSpace.save();
            res.status(200).json({ message: "ImmovableSpace updated successfully.", immovableSpace });
        } else {
            // If it does not exist, create a new ImmovableSpace
            immovableSpace = new ImmovableSpace({ name, sku });
            await immovableSpace.save();
            res.status(201).json({ message: "ImmovableSpace created successfully.", immovableSpace });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});