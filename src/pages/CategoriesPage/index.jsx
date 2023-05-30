import React from 'react'
import { useSelector } from 'react-redux';
import CategoryItem from '../../components/CategoryItem';
import s from './style.module.css'
// import { NavLink } from 'react-router-dom/dist';



export default function CategoriesPage() {

const category = useSelector(state => state.categories.list)


// console.log(category);
  return (
    <div className={s.container}>
      <h2 className={s.title}>Categories</h2>
      <div className={s.wrapper}>
        {
          category.map(item => <CategoryItem key={item.title} {...item} />)
        }
      </div>
      
    </div>
  )
}
