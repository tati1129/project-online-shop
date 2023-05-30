import React from 'react'
import BasketList from '../../components/BasketList'
import s from './style.module.css'


export default function BasketPage() {

  return (
    <div className={s.container}>
      <h2 >Shopping cart</h2>
      <BasketList />
    </div>
  )
}
