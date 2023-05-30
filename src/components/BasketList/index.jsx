import React, { useState } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import  { Link} from 'react-router-dom'
import BasketItem from '../BasketItem'
import { useForm } from 'react-hook-form';
import s from './style.module.css';
import { clear_basket } from '../../store/slice/basketSlice';
import SavePDForder from '../SavePDForder';



export default function BasketList() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [order, setOrder] = useState(null);
   
    const basket = useSelector(state => state.basket.list);
    const products = useSelector(state => state.products.list)

    const data = basket.map (item => {
        const product = products.find(({id}) => id === item.id)
        return {...item, ...product}
    })
    console.log(data);
  

    function render(){
        if (products.length === 0){
            return <p>Loading...</p>
        }else if(basket.length === 0){
            return <>
            <h3> Shopping cart is empty </h3>

            </>
        }else{
            return <>
                    <button className={s.btn_del_all} onClick={()=> dispatch(clear_basket())}>delete all</button>
                    {
                        data.map(elem => <BasketItem key={elem.id} {...elem} />)
                    }
                    </>  
        }
    }

    const countTotal = Number(data.reduce((prev,{count, price, discont_price}) => 
        discont_price !== null 
        ? (prev + discont_price * count)
        : (prev + price*+count), 0)).toFixed(2)

    const totalDiscount = (Number(data.reduce((prev, { count, price }) =>
        price !== null ? prev + price * count : prev, 0)) - countTotal).toFixed(2);


    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const onSubmit = dataPhone => {
        const order = {...dataPhone, id: Date.now(), data, total: countTotal}
        console.log(order);

        fetch('http://localhost:3333/order/send',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(order)
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            setOrder(order);
            setIsModalOpen(true);
        })
    }

    const closeModal = () => {
        setIsModalOpen(false);
        
      };

   
  return (
    <div className={s.wrapper}>
        
    	<div className={s.block_links}>
            <Link to='/products/all'>
                <p>Back to the store  〉 </p>
            </Link>
        </div>

        {basket.length > 0 && (
            <div className={s.wrapper_main}>
            
                <div className={s.container_list}>
                    <p className={s.line}></p>
                
                    <div className={s.container_list_items}>
                        {
                            render()
                        }
                    </div>
                </div>
                <div className={s.container_calculation}>
                    <p className={s.container_calculation_title} >Order details</p>
                    <div className={s.total}>
                        <p className={s.total_title}>Total: </p>
                        <p className={s.total_count}>{countTotal} <span>$</span></p>
                    </div>
                    <form className={s.form} onSubmit={handleSubmit(onSubmit)} method='POST' >
                        <input type="number"  {...register("phone", {pattern: /^\d{12}$/g})} placeholder='+ 49' />
                        <button>Order</button> 
                    </form>
                </div>
            </div>
        )}

       {isModalOpen && (
        <SavePDForder 
            order={order}
            data={data}
            countTotal={countTotal}
            totalDiscount={totalDiscount}
            onClose={closeModal}
        />
        )}
    </div>
  )
}



