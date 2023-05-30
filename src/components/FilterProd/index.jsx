import React from 'react'
import { useDispatch } from 'react-redux';
import {  filter_by_price, sort, clearFilters, searchProductsByName } from '../../store/slice/productsSlice';
import s from './style.module.css'
import { useLocation } from 'react-router';




export default function FilterProd({onDiscountChange, showOnlyDiscounted}) {

const dispatch = useDispatch();
const location = useLocation()

const handleSortChange = (e) => {
  dispatch(sort(e.target.value));
  
};

const handleSearchChange = (e) => {
  e.preventDefault();
  const target = e.target.value;
  console.log(target);
  dispatch(searchProductsByName(target))
}

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


      <form onChange={handleSearchChange} className={s.filter_title} >
        <input  type="text" placeholder='🔎 product ...' />
      </form>

      <div className={s.sort}>
        <p className={s.sort_title}>Sorted </p>
        <select  onChange={handleSortChange} >
          <option value=" " >select</option>
          <option value="1">Price ↑</option>
          <option value="2">Price ↓</option>
        </select>
        
      </div>

      <div>
        {
          (location.pathname !== '/products/sale') 
          ? <div className={s.discount}>
          <label className={s.checkbox_label} htmlFor="s.check_sale">Discounted items</label>
          <input className={s.custom_checkbox} type="checkbox" id='check_sale' onChange={onDiscountChange} checked={showOnlyDiscounted} />
        </div>
        : ''
        }
      </div>
       

   
    </div>
   
  
  )
}



