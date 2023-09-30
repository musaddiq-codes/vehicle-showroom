import express from 'express';
import mongoose from 'mongoose';

import CarObject from '../models/carCategories.js';

const router = express.Router();

export const getCars = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await CarObject.countDocuments({});
        const cars = await CarObject.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: cars, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCarsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const cars = await CarObject.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

        res.json({ data: cars });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCar = async (req, res) => {
    const { id } = req.params;

    try {
        const car = await CarObject.findById(id);

        res.status(200).json(car);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createCar = async (req, res) => {
    const car = req.body;

    const newCarObject = new CarObject({ ...car, creator: req.userId })

    try {
        await newCarObject.save();

        res.status(201).json(newCarObject);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateCar = async (req, res) => {
    const { id } = req.params;
    const { creator, name, color, model, make, regno, selectedFile } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No car with id: ${id}`);

    const updatedCar = { creator, name, color, model, make, regno, selectedFile, _id: id };

    await CarObject.findByIdAndUpdate(id, updatedCar, { new: true });

    res.json(updatedCar);
}

export const deleteCar = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No car with id: ${id}`);

    await CarObject.findByIdAndRemove(id);

    res.json({ message: "Car deleted successfully." });
}



export default router;