import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getVehicle, deleteVehicle } from '../../../../actions/vehicleActions';

const VehiclePost = ({ vehicle, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
 
  return (
    <div >
      <div >
        <h3 >{vehicle.color}</h3>
      </div>
      {(user?.result?._id === vehicle?.creator) && (
        <div name="edit">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(vehicle._id);
            }}
          >
            Edit ...
          </button>
        </div>
      )}

      <div >
        {(user?.result?._id === vehicle?.creator) && (
          <button onClick={() => dispatch(deleteVehicle(vehicle._id))}>
            Delete
          </button>
        )}
        <img width={'50px'} src={`${vehicle.selectedFile}`} />
      </div>
    </div>
  );
};

export default VehiclePost;
 