import express from 'express';

import { getVehicles,  getVehicle, createVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicleControllers.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getVehicles);
router.get('/:id', getVehicle);

router.post('/', auth,  createVehicle);
router.patch('/:id', auth, updateVehicle);
router.delete('/:id', auth, deleteVehicle);

export default router;      