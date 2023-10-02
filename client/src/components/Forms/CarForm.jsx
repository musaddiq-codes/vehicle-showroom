import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useNavigate } from 'react-router-dom';

import { createCar, updateCar } from '../../actions/carActions';
const initialState = { name: '', color: '', model: '', make: '', regno: '', selectedFile: '' }
const CarForm = ({ currentId, setCurrentId }) => {
    const [carData, setCarData] = useState(initialState);
    const car = useSelector((state) => (currentId ? state.cars.cars.find((message) => message._id === currentId) : null));
    // const car = useSelector((state) => (currentId ? state.cars.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    // const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useNavigate();

    const clear = () => {
        setCurrentId(0);
        setCarData({ name: '', color: '', model: '', make: '', regno: '', selectedFile: '' });
    };

    useEffect(() => {
        if (!car?.name) clear();
        if (car) setCarData(car);
    }, [car]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(carData)
        if (currentId === 0) {
            const { name, color, model, make, regno, selectedFile } = carData;
            if (name && color && model && make && regno && selectedFile) {
                dispatch(createCar({ ...carData, name: user?.result?.name }, history));
                clear();
            } else {
                alert('first fill all the details')
            }
        } else {
            dispatch(updateCar(currentId, { ...carData, name: user?.result?.name }));
            clear();
        }
    };

    return (
        <div>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <h4 >{currentId ? `Editing "${car?.title}"` : 'Registring a Car'}</h4>

                <input name="name" placeholder="Car Name" value={carData.name} onChange={(e) => setCarData({ ...carData, name: e.target.value })} />
                <input name="color" placeholder="Car Color" value={carData.color} onChange={(e) => setCarData({ ...carData, color: e.target.value })} />
                <input name="model" placeholder="Car Model" value={carData.model} onChange={(e) => setCarData({ ...carData, model: e.target.value })} />
                <input name="make" placeholder="Car Maker" value={carData.make} onChange={(e) => setCarData({ ...carData, make: e.target.value })} />
                <input name="regno" placeholder="Registration Number" value={carData.regno} onChange={(e) => setCarData({ ...carData, regno: e.target.value })} />

                <div >
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setCarData({ ...carData, selectedFile: base64 })} />
                </div>

                <button type="submit" >Submit</button>
                <button onClick={clear} >Clear</button>
            </form>
        </div>
    );
};

export default CarForm;
