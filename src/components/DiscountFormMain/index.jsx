import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import 'react-phone-number-input/style.css'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './style.module.css'


export default function DiscountFormMain() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCodeUsed, setIsCodeUsed] = useState(false);
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [discountCode, setDiscountCode] = useState('');



  function generateRandomString() {
    const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
    let randomString = '';
    for (let i = 0; i < 7; i++) {
      randomString += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomString;
  }
    

    const { register,  handleSubmit } = useForm();

    const onSubmit = async (data) => {
      const {phone} = data;
      const code = generateRandomString()
      const order = {...data, id: Date.now(), discontFirst: code}
      // setUsedNumbers([...usedNumbers, phone]);
      setUsedNumbers(prevUsedNumbers => {
        if(prevUsedNumbers.includes(phone)) {
          setIsCodeUsed(true);
          return prevUsedNumbers;
        } else {
          return [...prevUsedNumbers, phone]
        }
      })
      setDiscountCode(code);
    
      
    fetch('http://localhost:3333/sale/send',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(order)
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setIsModalOpen(true);
      })
  }
 
  const notify = () => {
    toast.success("Code copied successfully");}


    const closeModal = () => {
      setIsModalOpen(false);
      setIsCodeUsed(false);
    };

  return (
    <div className={s.container}>
        <div className={s.container_form}>
            <p className={s.container_form_discount}>5% off </p>
            <p className={s.container_form_info}>on the first order</p>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)} method='POST' >
              <input   type="number" {...register("phone", {pattern: /^\d{12}$/g})} placeholder='+ 49' />
              <button className={s.form_btn}>Get a discount</button>
            </form>
        </div>
        {isModalOpen  && (
          <div className={s.modal}>
            <div className={s.modal_content}>
              <button className={s.modal_btn} onClick={closeModal}>X</button>
              {isCodeUsed ? (
              <p className={s.kod_title_used}>This code <br/> has already been used...</p>
            ) : (
              <>
                <p className={s.kod_title}>Your discount code is:</p>
               
                  <p className={s.kod}>{discountCode}</p>
              <CopyToClipboard text={discountCode} >
                <button className={s.modal_copy_btn} onClick={notify}>Copy</button>
              </CopyToClipboard>
              </>
            )}
            </div>
          </div>
        )}
        <ToastContainer 
          autoClose={200}
          theme="light"
        />
    </div>
  )
}
