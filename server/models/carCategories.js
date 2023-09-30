import mongoose from 'mongoose';

const carSchema = mongoose.Schema({
    creator:  { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, required: true },
    model: { type: String, required: true },
    make: { type: String, required: true },
    regno: { type: String, required: true },
    selectedFile: { type: String, required: true },
})

var CarObject = mongoose.model('CarObject', carSchema);

export default CarObject;