import React from 'react'
import { useSelector } from 'react-redux'
import ProductItem from '../ProductItem'
import s from './style.module.css'




export default function ProductsList() {
    const {list, status, error} = useSelector(state => state.products)

    if (status === 'rejected'){
        alert(error)
      }




  return (
    <div className={s.container}>
        <h2>All Products</h2>
        <div className={s.block_sort}>block price</div>
        <div className={s.block_items}>
            {
                list.map(elem => <ProductItem  key={elem.id} {...elem}/>)
            }
        </div>
    </div>
  )
}
