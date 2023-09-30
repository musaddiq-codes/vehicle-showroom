import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';

import { createVehicle, updateVehicle } from '../../actions/vehicles';
import useStyles from './styles';

const VehicleForm = ({ currentId, setCurrentId }) => {
    const [vehicleData, setVehicleData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
    const post = useSelector((state) => (currentId ? state.vehicles.vehicles.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    const clear = () => {
        setCurrentId(0);
        setVehicleData({ title: '', message: '', tags: [], selectedFile: '' });
    };

    useEffect(() => {
        if (!post?.title) clear();
        if (post) setVehicleData(post);
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createVehicle({ ...vehicleData, name: user?.result?.name }, history));
            clear();
        } else {
            dispatch(updateVehicle(currentId, { ...vehicleData, name: user?.result?.name }));
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
                <h4 >{currentId ? `Editing "${post?.title}"` : 'Registring a Vehicle'}</h4>
                <input name="title" label="Title" value={vehicleData.title} onChange={(e) => setVehicleData({ ...vehicleData, title: e.target.value })} />
                <input name="message" label="Message" value={vehicleData.message} onChange={(e) => setVehicleData({ ...vehicleData, message: e.target.value })} />
                <input name="message" label="Message" value={vehicleData.message} onChange={(e) => setVehicleData({ ...vehicleData, message: e.target.value })} />
                <input name="message" label="Message" value={vehicleData.message} onChange={(e) => setVehicleData({ ...vehicleData, message: e.target.value })} />
                <input name="message" label="Message" value={vehicleData.message} onChange={(e) => setVehicleData({ ...vehicleData, message: e.target.value })} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setVehicleData({ ...vehicleData, selectedFile: base64 })} />
                </div>
                <button type="submit" >Submit</button>
                <button onClick={clear} >Clear</button>
            </form>
        </div>
    );
};

export default VehicleForm;
