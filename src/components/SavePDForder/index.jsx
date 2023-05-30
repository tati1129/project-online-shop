import React from 'react'
import { useDispatch } from 'react-redux';
import s from './style.module.css';
import { clear_basket } from '../../store/slice/basketSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SavePDForder({ order, data, countTotal, totalDiscount, onClose }) {

    const dispatch = useDispatch();

    const notify = () => toast.success("PDF saved successfully!");

    const handleSavePDF = () => {
        const pdfData = `
          Order ID: ${order.id}
          Phone number: ${order.phone}
          Order items:
          ${data.map((item) => `${item.title} - Quantity: ${item.count}, Price: ${item.price}`).join('\n')}
          Total: ${countTotal}$
          Total discount: ${totalDiscount}
        `;
    
        // console.log(pdfData);
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'order.pdf';
        link.click();
        URL.revokeObjectURL(url);
        dispatch(clear_basket())
      };

      


  return (
    <div className={s.modal}>
      <div className={s.modal_content}>
        <button className={s.modal_btn} onClick={onClose}>X</button>
        <p>Order information:</p>
        <p>Order ID: <span className={s.order_id}>{order?.id}</span> </p>
        <p>Phone number: <span className={s.order_phone}>{order?.phone}</span></p>
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
        <p>Total discount: {totalDiscount}$</p>
        <button className={s.modal_pdf_btn} onClick={()=>{handleSavePDF(); notify()}}>Save as PDF</button>
      </div>
      <ToastContainer 
          autoClose={200}
          theme="light"
        />
    </div>
  );

}
