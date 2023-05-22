import React from 'react'
import s from './style.module.css'
import Map from '../Map'
import shipping from '../../image/ship.jpg'
import eco from '../../image/eco.jpg'


import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useJsApiLoader } from '@react-google-maps/api'



const API_KEY = process.env.REACT_APP_API_KEY;
const defaultCenter = {
  lat:  52.507911,
  lng: 13.375102 
};

const libraries = ['places']
export default function Footer() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries
  })
  return (

    <div className={s.container}>
      <div className={s.contacts_block}>
        
        
        <div className={s.img_ecofriendly}>
          <img src={eco} alt="" />
        </div>
        <div className={s.img_shipping}>
          <img src={shipping} alt="" />
        </div>
        <div className={s.contact_info}>
          <p className={s.contact_info_title}>Contact</p>
          <p className={s.contact_tel}> +49 999 999 99 99</p>
          
        </div>
       
        <div className={s.address}>
          <p className={s.address_title}>Address</p>
          <p className={s.address_info}>Linkstraße 2, 8 OG, 10785,<br/> Berlin, Deutschland</p> 
        </div>
        <div className={s.working}>

          <p className={s.work_info}>Working Hours:</p>
          
          <p className={s.work_time}>24 hours a day</p>
          <div className={s.buttons}>
          <button className={s.btns} ><FontAwesomeIcon  icon={faInstagram} className={s.btn} /></button>
          <button className={s.btns}><FontAwesomeIcon icon={faWhatsapp} className={s.btn} /></button>
        </div>
        </div>
        </div>
        <div className={s.map}>
          {isLoaded ? <Map center={defaultCenter} /> :  <h2>Loading ...</h2>}
        </div>
 
    </div>
  )
}

/*  */