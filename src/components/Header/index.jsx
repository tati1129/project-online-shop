import React from 'react'
import logo from '../../image/logo.png'
import s from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
// import CustNavLink from '../CustNavLink'
import {  NavLink,  useLocation, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useState } from 'react'

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const location = useLocation();
    const isActiveBasket = location.pathname === '/basket';
    const isActiveCategory = location.pathname === '/categories'

    const isActive = ({isActive}) => [isActive ? s.active : '', s.links].join(' '); 

    // console.log(location);
  
   
    const links = [
        {id: 1, label: 'Main Page', to: '/'},
        {id: 2, label: 'All products', to: '/products/all'},
        {id: 3, label: 'All sales', to: '/products/sale'}
      ] 

    const navigation = useRef()
 

    const navBtnHandler =() => {
    navigation.current.classList.toggle(s.nav_open);


    }

      

  return (
    <div className={s.container}>
        <div className={s.logo_block}>
            <div>
                <img src={logo} alt="logo"className={s.logo} />
            </div>
            <div>
                <NavLink to='/categories' className={isActiveCategory ? `${s.activeCatalog} ${s.catalog}` : s.catalog} >Catalog</NavLink>
            </div>
        </div>
        
         
         
        
        <nav  /* className={s.nav} */  className={`${s.nav} ${isNavOpen ? s.nav_open : ''}`}>
            <div ref={navigation}  className={s.navigation}>
                { 
                links.map(({id, label, to}) => <NavLink  className={isActive} 
    
                 key={id} to={to}> {label} 
                 </NavLink> )
            }
            </div>
            
        </nav>
        <div>
            <button className={s.basket_btn} >
        <NavLink to='/basket' className={isActiveBasket ? `${s.activeBasket} ${s.basket_icon}` : s.basket_icon}><FontAwesomeIcon icon={faCartShopping}  />
            </NavLink> </button>
            </div>
        <button  onClick={navBtnHandler} className={s.navBtn}>≡</button>
    </div>
  )
}
