import React from 'react';
// import { useSelector } from 'react-redux';
import CarPost from './CarPost/CarPost';

const CarPosts = ({ cars, isLoading, currentId, setCurrentId }) => {

  // const { cars, isLoading } = useSelector((state) => state.cars);

  if (!cars.length && !isLoading) return 'No cars';

  return (
    isLoading ? <h1>Loading...</h1> : (
      <div>
        {cars?.map((car) => (
          <div key={car._id} >
            <CarPost car={car} setCurrentId={setCurrentId} />
          </div>
        ))}
      </div>
    )
  );
};

export default CarPosts;
