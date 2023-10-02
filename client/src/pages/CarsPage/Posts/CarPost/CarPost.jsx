import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getCar, deleteCar } from '../../../../actions/carActions';

const CarPost = ({ car, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const dataFromDatabase = {
    // ... your data here
    selectedFile: "data:image/jpeg;base64,/9j/4AAQSkJRgABAQAAAQABAA"
  };

  return (
    <div >
      {/* <CardMedia className={classes.media} image={car.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={car.title} /> */}
      <div >
        <h3 >{car.color}</h3>
      </div>
      {(user?.result?._id === car?.creator) && (
        <div name="edit">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(car._id);
            }}
          >
            Edit ...
          </button>
        </div>
      )}

      <div >
        {(user?.result?._id === car?.creator) && (
          <button onClick={() => dispatch(deleteCar(car._id))}>
            Delete
          </button>
        )}
        <img width={'50px'} src={`${car.selectedFile}`} />
      </div>
    </div>
  );
};

export default CarPost;
