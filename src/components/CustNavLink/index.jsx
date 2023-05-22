import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './style.module.css'

export default function CustNavLink({label, count, ...item}) {
    const isActive = ({isActive}) => [isActive ? s.active : '', s.link].join(' '); 
  return (
    <div>
         <NavLink data-count={count || undefined} className={isActive} {...item} > {label} </NavLink>
    </div>
  )
}
