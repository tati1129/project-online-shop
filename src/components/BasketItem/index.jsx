import React from 'react'
import s from './style.module.css'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { decrement_basket, increment_basket, remove_basket } from '../../store/slice/basketSlice';

export default function BasketItem({id, image, title, price, discont_price, count}) {
    const dispath = useDispatch();
    const URL = 'http://localhost:3333/'  
    const productLink = `/product/${id}`;
    
  return (
    <>
    
    <div className={s.container}>
        <div className={s.block_image}>
            <Link to={productLink} >
                <img className={s.image} src={`${URL}${image}`} alt={title} />
            </Link>
        </div>
        <div className={s.container_info}>
            <p className={s.container_title}>{title}</p>
            <div className={s.container_info_btn}>
                <button  onClick={()=> dispath(decrement_basket(id))}>-</button>
                <p>{count}</p>
                <button onClick={()=> dispath(increment_basket(id))}>+</button>  
            </div>
        </div>
        <div className={s.block_price}>
           
            {discont_price !== null ?   <p className={s.discont_price}>{discont_price}<span>$</span>
            </p> : '' } 
            {discont_price === null ? <p className={s.discont_price}>{price}<span>$</span></p> : <p className={s.normal_price}>{price}$</p> } 
        </div>
        <button className={s.container_btn} onClick={()=> dispath(remove_basket(id))}>x</button>
        <p className={s.liner}></p>
    </div>
    {/* <p className={s.line}></p> */}
    </>
  )
}
