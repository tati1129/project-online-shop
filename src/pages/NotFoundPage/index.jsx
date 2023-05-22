import React from 'react'
import s from './style.module.css'
// import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className={s.wrapper}>
      <div className={s.info}>
        <h2>404</h2>
        <p>Oops, there's nothing here...</p>
        {/* <Link to='/'> Main Page</Link> */}
      </div>
      
    </div>
  )
}
