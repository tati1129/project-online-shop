import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  filter_by_price, sort, clearFilters } from '../../store/slice/productsSlice';
import { useState } from 'react';
import s from './style.module.css'
import { useLocation } from 'react-router';



export default function FilterProd({onDiscountChange, showOnlyDiscounted, showDiscount}) {

const dispatch= useDispatch();
// const initialValue = {min:0, max: Infinity}

const handleSortChange = (e) => {
  dispatch(sort(e.target.value));
  
};
const location = useLocation()
// console.log(location.pathname);

// const min = useSelector((state) => state.products.min) || '';
//   const max = useSelector((state) => state.products.max) || '';

  // useEffect(() => {
  //   dispatch(filter_by_price({min, max}));
  // }, [dispatch, min, max]);

  // const minHandler = ({target}) => {
  //   const value = target.value  === '' ? -Infinity : +target.value ;
  //   dispatch(filter_by_price({ min: value, max }));
  // }

  // const maxHandler = ({target}) => {
  //   const value = target.value === '' ? Infinity : +target.value;
  //   dispatch(filter_by_price({ min, max: value }));
  // }

  // const clearFilters = () => {
  //   dispatch(filter_by_price({ initialValue }));
  // }; 

  /* const initialValue = { min: 0, max: Infinity };
  const [price, setPrice] = useState(initialValue);

  useEffect(() => {
    dispatch(filter_by_price(price));
  }, [ price]);

  const setMaxPrice = (value) => setPrice(({ min }) => ({ min, max: value }));
  const setMinPrice = (value) => setPrice(({ max }) => ({ min: value, max }));

  const minHandler = ({target}) => {
    const value = target.value  === '' ? 0 : +target.value;
    setMinPrice(value);
  };

  const maxHandler = ({ target }) => {
    const value = target.value === '' ? Infinity : +target.value;
    setMaxPrice(value);
  };

  console.log(price);*/


  const filterFromTo = e => {
    const formData = new FormData(e.target.parentNode)
    const data  = Object.fromEntries(formData)
    data.min = (data.min === '')? -Infinity: +data.min
    data.max = (data.max === '')? Infinity: +data.max
    console.log(data);
    dispatch(filter_by_price(data))
  }
 
  return (
  
      <div className={s.wrapper}>

     <form onChange={filterFromTo} className={s.filter_price}>
        <p className={s.filter_price_title}>Price:</p>
        <input className={s.input_price} type="number" name="min" placeholder="from" />
        <input className={s.input_price} type="number" name="max"  placeholder="to"/>
        <button onClick={clearFilters}>×</button>
      </form> 


     {/* <div className={s.filter_price}>
      <p> Price</p>
        <input onChange={minHandler} value={min === -Infinity ? '' : min} type="number" placeholder="min" />
        <input onChange={maxHandler} value={max === Infinity ? '' : max} type="number" placeholder="max" />
        <button onClick={clearFilters}>x</button>
    
      </div> */}


      {/* <form >
        <input onChange={handleFrom} name='from' type="number" placeholder="from" />
        <input onChange={(e)=> dispatch(filter_price_to((+e.target.value)))} name='to' type="number" placeholder="to"/>
      </form> */}


        {/* <form onChange={handleFilterByPrice}>
        <p> Price </p>
          <input name='min' type="number" placeholder="from" />
          <input name='max' type="number" placeholder="to"/>
        </form> */}
      <div>
        {
          (location.pathname !== '/products/sale') 
          ? <div className={s.discount}>
          <label className={s.checkbox_label} htmlFor="s,check_sale">Discounted items</label>
          <input className={s.custom_checkbox} type="checkbox" id='check_sale' onChange={onDiscountChange} checked={showOnlyDiscounted} />
        </div>
        : ''
        
        }
      </div>
        {/*  */}
       
      
      

      <div className={s.sort}>
        <p className={s.sort_title}>Sorted </p>
        <select  onChange={handleSortChange} >
          <option value="">by default </option>
          <option value="1">Price ↑</option>
          <option value="2">Price ↓</option>
        </select>
        
      </div>
      </div>
   
  
  )
}


/*  // const filterbyPrice = (e) => {
  //   let data = Object.fromEntries(new FormData(e.target.parentNode))
  //   data.from = (data.from === '') ? -Infinity : +data.from;
  //   data.to = (data.to ==='') ? Infinity : +data.to;
  //   dispatch(filter_price(data))
  // }
   */


  // const handleFrom = (e) => {
  //   console.log();
  //   dispatch(filter_price_from(+e.target.value))
  // }

  // const handleFilterByPrice = (e) => {
  //   let formData = new FormData(e.target.parentNode)
  //   let  data  = Object.fromEntries(formData)
    
  //   data.min = (data.min === '') ? -Infinity: +data.min
  //   data.max = (data.max === '') ? Infinity: +data.max
  //   console.log(data);
  //   dispatch(filter_by_price(data));
    
  // }

