import express from 'express';

import { getCars, getCarsBySearch, getCar, createCar, updateCar, deleteCar } from '../controllers/CarControllers.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/search', getCarsBySearch);
router.get('/', getCars);
router.get('/:id', getCar);

router.post('/', auth,  createCar);
router.patch('/:id', auth, updateCar);
router.delete('/:id', auth, deleteCar);
 
export default router; 