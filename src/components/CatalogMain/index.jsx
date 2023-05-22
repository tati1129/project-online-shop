import React, { useState } from 'react'
import s from './style.module.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import CategoryItem from '../CategoryItem';


export default function CatalogMain() {
  const { status, error} = useSelector(state => state.categories);
  const categ = useSelector(state => state.categories.list)

const categoriesRandom = [...categ].slice().sort(() => 0.5 - Math.random()).slice(0, 4);


  // const random = [];
  // while (random.length < 4){
  //   const index = Math.round(Math.random()  * list.length);
  //   random.push(list[index])
  // } 
 
if (status === 'rejected'){
  alert(error)
}

/* const categoryRandom = [];
    while (categoryRandom.length < 4) {
      const randomIndex =  Math.round(Math.random()  * list.length);
      categoryRandom.push(list[randomIndex]);
    }
    console.log(categoryRandom); */

  return (
    <div className={s.container}>
        <div className={s.block_btns}>
            <p className={s.title}>Catalog</p>
            <div> <NavLink to='/categories' className={s.btn} >All categories</NavLink></div>
        </div>
        
        <div className={s.block_items}>
          {
            categoriesRandom.map(item => <CategoryItem key={item.id} {...item} />)
          }
        </div>
    </div>
  )
}
