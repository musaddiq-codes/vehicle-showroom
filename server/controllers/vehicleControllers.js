import express from 'express';
import mongoose from 'mongoose';

import VehicleObject from '../models/vehicleCategories.js';

const router = express.Router();

export const getVehicles = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await VehicleObject.countDocuments({});
        const vehicles = await VehicleObject.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: vehicles, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getVehiclesBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const vehicles = await VehicleObject.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

        res.json({ data: vehicles });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getVehicle = async (req, res) => {
    const { id } = req.params;

    try {
        const vehicle = await VehicleObject.findById(id);

        res.status(200).json(vehicle);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createVehicle = async (req, res) => {
    const vehicle = req.body;

    const newVehicleMessage = new VehicleObject({ ...vehicle, creator: req.userId })

    try {
        await newVehicleMessage.save();

        res.status(201).json(newVehicleMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateVehicle = async (req, res) => {
    const { id } = req.params;
    const { creator, name, color, model, type, regno, selectedFile } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No vehicle with id: ${id}`);

    const updatedVehicle = { creator, name, color, model, type, regno, selectedFile, _id: id };

    await VehicleObject.findByIdAndUpdate(id, updatedVehicle, { new: true });

    res.json(updatedVehicle);
}

export const deleteVehicle = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No vehicle with id: ${id}`);

    await VehicleObject.findByIdAndRemove(id);

    res.json({ message: "Vehicle deleted successfully." });
}



export default router;