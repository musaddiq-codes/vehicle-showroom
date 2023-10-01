import React from 'react';
// import { useSelector } from 'react-redux';
import VehiclePost from './VehiclePost/VehiclePost';

const VehiclePosts = ({ vehicles, isLoading, currentId, setCurrentId }) => {

  // const { vehicles, isLoading } = useSelector((state) => state.vehicles);

  if (!vehicles.length && !isLoading) return 'No vehicles';

  return (
    isLoading ? <h1>Loading...</h1> : (
      <div>
        {vehicles?.map((vehicle) => (
          <div key={vehicle._id} >
            <VehiclePost vehicle={vehicle} setCurrentId={setCurrentId} />
          </div>
        ))}
      </div>
    )
  );
};

export default VehiclePosts;
