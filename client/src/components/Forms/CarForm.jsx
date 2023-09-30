import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';

import { createVehicle, updateVehicle } from '../../actions/cars';
import useStyles from './styles';

const CarForm = ({ currentId, setCurrentId }) => {
    const [carData, setCarData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
    const car = useSelector((state) => (currentId ? state.cars.cars.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    const clear = () => {
        setCurrentId(0);
        setCarData({ title: '', message: '', tags: [], selectedFile: '' });
    };

    useEffect(() => {
        if (!car?.title) clear();
        if (car) setCarData(car);
    }, [car]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createVehicle({ ...carData, name: user?.result?.name }, history));
            clear();
        } else {
            dispatch(updateVehicle(currentId, { ...carData, name: user?.result?.name }));
            clear();
        }
    };

    if (!user?.result?.name) {
        return (
            <div>
                <h5 >
                    Please Sign In to create your own memories and like other's memories.
                </h5>
            </div>
        );
    }

    return (
        <div>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <h4 >{currentId ? `Editing "${car?.title}"` : 'Registring a Car'}</h4>
                <input name="title" label="Title" value={carData.title} onChange={(e) => setCarData({ ...carData, title: e.target.value })} />
                <input name="message" label="Message" value={carData.message} onChange={(e) => setCarData({ ...carData, message: e.target.value })} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setCarData({ ...carData, selectedFile: base64 })} />
                </div>
                <button type="submit" >Submit</button>
                <button onClick={clear} >Clear</button>
            </form>
        </div>
    );
};

export default CarForm;
