import React from 'react'
import s from './style.module.css'
import { Link } from 'react-router-dom'


export default function CategoryItem({id, image, title,}) {

  const URL = 'http://localhost:3333/'
 
  return (
    <div className={s.container}>
      
      <Link to={`/products/categories/${id}`} className={s.container}>
          <img className={s.image}  src={`${URL}${image}`} alt={title} />
          </Link>
       <p  className={s.title}>{title}</p> 
        
      
    </div>
  )
}

/* {categories.map((category) => (
          <li key={category.id}>
            <NavLink
            //   onClick={onClick}
              className={isActive}
              to={`/products/${category.title}`}
            >
              <p>{category.title}</p>
            </NavLink>
            </li>
        ))} */