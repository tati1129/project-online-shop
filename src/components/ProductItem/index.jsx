import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import s from './style.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { add_basket } from '../../store/slice/basketSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ProductItem({id, image, title,price, discont_price}) {
  const dispatch = useDispatch();

const discount = Math.round(discont_price*100/price - 100)
const URL = 'http://localhost:3333/'  
const link = `/product/${id}`;

const notify = () => {
  dispatch(add_basket(id));
  toast.success("Product added to  🛒 !");}

  return (
    <div className={s.container}>
      <div className={s.block_img}>
        <Link to={link} >
          <img className={s.image} src={`${URL}${image}`} alt={title} />
      </Link>
      
      <button className={s.btn_basket} onClick={notify}>
            <FontAwesomeIcon icon={faCartShopping} className={s.basket_icon} />
          </button>
          </div>
      <div className={s.block_price}>
            <p className={s.price_discount}>{discont_price !== null ?  discont_price + ` $` : price + ` $` }</p>
            <p className={s.price_normal}>{discont_price === null ? '' : price+`$`}</p>
            <p className={s.price_percent}>{discont_price===null ? '': discount + `%`}</p>
        </div>
        <div className={s.title}>
          <p >{title}</p>
        </div>
        <ToastContainer 
          autoClose={200}
          theme="light"
        />
    </div>
  )
}
