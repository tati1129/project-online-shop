import React, { useState } from 'react'
import { useSelector, } from 'react-redux'
import  { Link, useNavigate } from 'react-router-dom'
import BasketItem from '../BasketItem'
import { useForm } from 'react-hook-form';
import s from './style.module.css';



export default function BasketList() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [order, setOrder] = useState(null);
   
    
    const basket = useSelector(state => state.basket.list);
    // console.log(basket);
    const products = useSelector(state => state.products.list)
    const data = basket.map (item => {
        const product = products.find(({id}) => id === item.id)
        return {...item, ...product}
    })
    console.log(data);
    
    const navigate = useNavigate()

    function handleGoBack(){
      navigate(-1)
    }

    function rernder(){
        if (products.length === 0){
            return <p>Loading...</p>
        }else if(basket.length === 0){
            return <p>Shopping cart is empty </p>
        }else{
            return <>
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
// console.log(+countTotal);

/* const countTotal = Math.round(data.reduce((acc, {price,discont_price,count}) => 
    discont_price !== null
    ? acc + discont_price*count
    : acc + price*count,0)) */

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
    // console.log(errors);
   
    const handleSavePDF = () => {
        const pdfData = `
      Order ID: ${order.id}
      Phone number: ${order.phone}
      Order items:
      ${data.map((item) => `${item.title} - Quantity: ${item.count}, Price: ${item.price}`).join('\n')}
      Total: ${countTotal}$
    `;

        console.log(pdfData);
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'order.pdf';
        link.click();
        URL.revokeObjectURL(url);
      };
      
   
  return (
    <div className={s.wrapper}>

    	<div className={s.block_links}>
            <Link to='/products/all'>
                <p>Back to the store  〉 </p>
            </Link>
            <Link onClick={handleGoBack} > <p>Back to previous page  〉 </p> </Link>   
        </div>
        <div className={s.wrapper_main}>
            <div className={s.container_list}>
                <p className={s.line}></p>
                <div className={s.container_list_items}>
                    {
                        rernder()
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
                    <input  /* type="number" */ {...register("phone", {pattern: /^[0-9]{12,14}$/g})} placeholder='Phone number' />

                    <button>Order</button>
                    
                </form>
            </div>
        </div>

       {isModalOpen && (
        <div className={s.modal}>
            <div className={s.modal_content}>
              <button className={s.modal_btn} onClick={closeModal}>X</button>
              <p>Order iformation:</p>
              <p>Order ID: 
               <span className={s.order_id}>{order?.id}</span> </p>
              <p>Phone number: 
                <span className={s.order_phone}>{order?.phone}</span>
                </p>
          <p>Order items:</p>
          {data && (
                <table className={s.table}>
                    <thead>
                        <tr>
                            <th className={s.tableHeader}>Product</th>
                            <th className={s.tableHeader}>Quantity</th>
                            <th className={s.tableHeader}>Price</th>
                        </tr>
                    </thead>
                <tbody>
                    {data.map(item => (
                    <tr key={item.id}>
                        <td className={s.tableCell}>{item.title}</td>
                        <td className={s.tableCell}>{item.count}</td>
                        <td className={s.tableCell}>{item.price}</td>
                    </tr>
                ))}
                </tbody>
                </table>
            )}
          <p>Total: {countTotal}$</p>
          <button className={s.modal_pdf_btn} onClick={handleSavePDF}>Save as PDF</button>
              </div>
        
        </div>
       )}
    </div>
  )
}



/* /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  if((inputtxt.value.match(phoneno))
        {
      return true;
        }
      else
        {
        alert("message");
        return false;
        }
}

Flowchart:

Flowchart : JavaScript - phone validation-3
Following code blocks contain actual codes for the said validations. We have kept the CSS code part common for all the validations.

CSS Code

 li {list-style-type: none;
font-size: 16pt;
}
.mail {
margin: auto;
padding-top: 10px;
padding-bottom: 10px;
width: 400px;
background : 
#D8F1F8;
border: 1px soild 
silver;
}
.mail h2 {
margin-left: 38px;
}
input {
font-size: 20pt;
}
input:focus, textarea:focus{
background-color: 
lightyellow;
}
input submit {
font-size: 12pt;
}
.rq {
color: 
#FF0000;
font-size: 10pt;
}

Validate a 10 digit phone number

At first we validate a phone number of 10 digit. For example 1234567890, 0999990011, 8888855555 etc.

HTML Code

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>JavaScript form validation - checking non-empty</title>
<link rel='stylesheet' href='form-style.css' type='text/css' />      
</head><body onload='document.form1.text1.focus()'>
<div class="mail">
<h2>Input an Phone No.[xxxxxxxxxx] and Submit</h2>
<form name="form1" action="#">
<ul>
<li><input type='text' name='text1'/></li>
<li>&nbsp;</li>
<li class="submit"><input type="submit" name="submit" value="Submit" onclick="phonenumber(document.form1.text1)"/></li>
<li>&nbsp;</li>
</ul>
</form>
</div>
<script src="phoneno-all-numeric-validation.js"></script>
</body>
</html>

JavaScript Code

function phonenumber(inputtxt)
{
  var phoneno = /^\d{10}$/;
  if(inputtxt.value.match(phoneno))
  {
      return true;
  }
  else
  {
     alert("Not a valid Phone Number");
     return false;
  }
  }

View the example in the browser

Flowchart:

Flowchart : JavaScript - phone validation 10 digit
Validate North American phone numbers

Now, let's see how to validate a phone number, either in 222-055-9034, 321.789.4512 or 123 256 4587 formats.

HTML Code

<!DOCTYPE html><html lang="en"><head>
<meta charset="utf-8">
<title>JavaScript form validation - checking non-empty</title>
<link rel='stylesheet' href='form-style.css' type='text/css' />      
</head>
<body onload='document.form1.text1.focus()'>
<div class="mail">
<h2>Input an Phone No.[xxx-xxx-xxxx, xxx.xxx.xxxx, xxx xxx xxxx] and Submit</h2>
<form name="form1" action="#"> 
<ul>
<li><input type='text' name='text1'/></li>
<li>&nbsp;</li>
<li class="submit"><input type="submit" name="submit" value="Submit" onclick="phonenumber(document.form1.text1)"/></li>
<li>&nbsp;</li>
</ul>
</form>
</div>
<script src="phoneno-international-format.js"></script>
</body>
</html>

JavaScript Code

function phonenumber(inputtxt)
{
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(inputtxt.value.match(phoneno))
     {
	   return true;      
	 }
   else
     {
	   alert("Not a valid Phone Number");
	   return false;
     }
}

View the example in the browser

Flowchart:

Flowchart : JavaScript - phone validation North America
Validate an international phone number with country code

Now, let's see how to validate a phone number with country code, either in +24-0455-9034, +21.3789.4512 or +23 1256 4587 format.

HTML Code

<!DOCTYPE html><html lang="en"><head>
<meta charset="utf-8">
<title>JavaScript form validation - checking non-empty</title>
<link rel='stylesheet' href='form-style.css' type='text/css' />
</head>

<body onload='document.form1.text1.focus()'>
<div class="mail">
<h2>Input an Phone No.[+xx-xxxx-xxxx, +xx.xxxx.xxxx, +xx xxxx xxxx] and Submit</h2>
<form name="form1" action="#"> 
<ul>
<li><input type='text' name='text1'/></li>
<li>&nbsp;</li>
<li class="submit"><input type="submit" name="submit" value="Submit" onclick="phonenumber(document.form1.text1)"/></li>
<li>&nbsp;</li>
</ul>
</form>
</div>
<script src="phoneno-+international-format.js"></script>
</body>
</html>

JavaScript Code

function phonenumber(inputtxt)
{
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(inputtxt.value.match(phoneno))
     {
	   return true;
	 }
   else
 
 */