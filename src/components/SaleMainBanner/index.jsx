import React from 'react'
import { Link } from 'react-router-dom'
import s from './style.module.css'
import ProductsPage from '../../pages/ProductsPage'





export default function SaleMainBanner() {

  return (

    <div className={s.container}>
      <div className={s.sale}>
        <p className={s.p_sale}>Sale</p>
        <p className={s.p_season}>New season</p>

        <div>
          <Link to='/products/sale' className={s.sale_btn} element={<ProductsPage/>} >Sale</Link>
        </div>
      </div>
    </div>
    
  )
}
