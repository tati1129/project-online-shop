import React from 'react'
import { useSelector } from 'react-redux'
import ProductItem from '../ProductItem';
import s from './style.module.css'
import { Link, NavLink } from 'react-router-dom';
import ProductsPage from '../../pages/ProductsPage';


export default function SalesListMain() {


const prodList = useSelector(state => state.products.list)
// console.log(prodList);


    const products = prodList.filter(({discont_price}) => discont_price !== null )
const productsRandom = products.slice().sort(() => 0.5 - Math.random()).slice(0, 3);
//  console.log(productsRandom);


  return (
    <div className={s.wrapper}>
      <div className={s.block_btns}>
        <p className={s.title}>Sale</p>
        <div className={s.sale_btn}><Link to='/products/sale' element={<ProductsPage/>} >Sale</Link></div>
       
      </div>
        
        <div className={s.block_items} > 
          {
              productsRandom.map(prod => <ProductItem key={prod.id} {...prod} /> )
          }
          
            
        </div>
    </div>
  )
}
