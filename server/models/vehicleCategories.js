import mongoose from 'mongoose';

const vehicleSchema = mongoose.Schema({
    creator:  { type: String, required: true },
    type: { type: String, required: true },
    color: { type: String, required: true },
    model: { type: String, required: true },
    regno: { type: String, required: true },
    selectedFile: { type: String, required: true },
})

var VehicleObject = mongoose.model('VehicleObject', vehicleSchema);

export default VehicleObject; 