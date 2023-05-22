import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import s from './style.module.css'
import { add_basket } from '../../store/slice/basketSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function ProductDescriptionPage() {
  const dispatch = useDispatch()

  const URL = 'http://localhost:3333/'
  const {id} = useParams();
  
  const product = useSelector(state => state.products.list.find(elem => elem.id === +id))

  // const percent = ( product.discont_price * 100 / +product.price - 100).toFixed(2)

  
  const notify = () => {
    dispatch(add_basket(id));
    toast.success("Product added to  🛒 !");}


  return (
    <div className={s.contain}>
      {
        product === undefined
        ? <p>Loading...</p>
        : <div className={s.wrapper}>
            <h2 className={s.title}>{product.title}</h2>
            <div className={s.contain}>
              <img className={s.image} src={`${URL}${product.image}`} alt="" />
              <div className={s.block}>
        
                <div >
                  {
                    product.discont_price === null 
                    ? <p className={s.price}>{product.price}<span>$</span></p>
                    : <div className={s.block_price}>
                        <p className={s.price}>{product.discont_price}<span>$</span></p>
                        <p className={s.price_normal} >{product.price}$</p>
                        <p className={s.price_percent}>{Math.round( product.discont_price * 100 / +product.price - 100)}<span>%</span> </p>
                    </div>
                  }
                </div>
                <button className={s.btn_basket} onClick={notify}>
                  <FontAwesomeIcon icon={faCartShopping} className={s.basket_icon} />
                </button>
                <p className={s.line}></p>
                <div className={s.description_title}>Description
                  <p className={s.description_text}>{product.description}</p>
                </div>
              </div>
              
            </div>

          </div>
      }

   <ToastContainer 
    position="top-right" 
    autoClose={1000}
    theme="light"
   />
    </div>
  )
}
