import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import { createVehicle, updateVehicle } from '../../actions/vehicleActions';

const CarForm = ({ currentId, setCurrentId }) => {
  const [VehicleData, setVehicleData] = useState({ type: '', color: '', model: '', regno: '', selectedFile: '' });
  const vehicle = useSelector((state) => (currentId ? state.vehicle.vehicle.find((vehicle) => vehicle._id === currentId) : null));
  const dispatch = useDispatch();
  const history = useNavigate();

  const clear = () => {
    setCurrentId(0);
    setVehicleData({ type: '', color: '', model: '',  regno: '', selectedFile: '' });
  };

  useEffect(() => {
    if (!vehicle?.name) clear();
    if (vehicle) setVehicleData(vehicle);
  }, [vehicle]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createVehicle({ ...VehicleData, }, history));
      clear();
    } else {
      dispatch(updateVehicle(currentId, { ...VehicleData, }));
      clear();
    }
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h4>{currentId ? `Editing "${vehicle?.type}"` : 'Registering a Vehicle'}</h4>

        <div>
          <label>Vehicle Type:</label>
          <select name="type" value={VehicleData.type} onChange={(e) => setVehicleData({ ...VehicleData, type: e.target.value })}>
            <option value="bus">bus</option>
            <option value="suv">suv</option>
            <option value="truck">Truck</option>
          </select>
        </div>

        <input name="color" placeholder="Vehicle Color" value={VehicleData.color} onChange={(e) => setVehicleData({ ...VehicleData, color: e.target.value })} />
        <input name="model" placeholder="Vehicle Model" value={VehicleData.model} onChange={(e) => setVehicleData({ ...VehicleData, model: e.target.value })} />
        <input name="regno" placeholder="Registration Number" value={VehicleData.regno} onChange={(e) => setVehicleData({ ...VehicleData, regno: e.target.value })} />

        <div>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setVehicleData({ ...VehicleData, selectedFile: base64 })} />
        </div>

        <button type="submit">Submit</button>
        <button onClick={clear}>Clear</button>
      </form>
    </div>
  );
};

export default CarForm;
