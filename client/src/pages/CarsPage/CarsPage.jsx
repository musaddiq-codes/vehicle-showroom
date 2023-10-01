import React from 'react'
import CarForm from '../../components/Forms/CarForm'
import CarPosts from './Posts/CarPosts';
import styles from './carspage.module.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCars } from '../../actions/carActions';
import { useState } from 'react';
import { useSelector } from 'react-redux';


const CarsPage = () => {


  const [currentId, setCurrentId] = useState(0)
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(20)

  useEffect(() => {
    // console.log('effect occord at carspage')
    dispatch(getCars(page))
  }, [page])

  const { cars, isLoading } = useSelector((state) => state.cars);

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
    <div className={styles.cars_page_container} >
      <div className={styles.cars_posts}>
        <CarPosts cars={cars} isLoading={isLoading} currentId={currentId} setCurrentId={setCurrentId} />
      </div>
      <div className={styles.cars_form}>
        <CarForm currentId={currentId} setCurrentId={setCurrentId} />
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