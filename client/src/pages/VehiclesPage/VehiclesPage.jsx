import React from 'react'
import VehicleForm from '../../components/Forms/VehicleForm'
import VehiclePosts from './Posts/VehiclePosts';
import styles from './carspage.module.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getVehicles } from '../../actions/vehicleActions';

const CarsPage = () => {

  const [currentId, setCurrentId] = useState(0)
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    dispatch(getVehicles(page))
  }, [page])

  const { vehicles, isLoading } = useSelector((state) => state.vehicles);

  function handlePrevious() {
    setPage((currentPageNum) => {
      if (currentPageNum === 1) return currentPageNum;
      return currentPageNum - 1;
    });
  }

  function handleNext() {
    setPage((currentPageNum) => {
      if (currentPageNum === pageCount) return currentPageNum;
      return currentPageNum + 1;
    });
  }



  return (
    <div className={styles.vehicles_page_container} >
      <div className={styles.vehicles_vehicles}>
        <VehiclePosts vehicles={vehicles} isLoading={isLoading} currentId={currentId} setCurrentId={setCurrentId} />
      </div>
      <div className={styles.vehicles_form}>
        <VehicleForm currentId={currentId} setCurrentId={setCurrentId} />
        <footer>
          <button disabled={page === 1} onClick={handlePrevious}>Previous</button>
          {page}
          <button disabled={page === pageCount} onClick={handleNext}>Next</button>
        </footer>
      </div>

    </div>
  )
}

export default CarsPage