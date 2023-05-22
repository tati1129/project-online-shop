import React, { useEffect } from 'react'
import SaleMain from '../../components/SaleMainBanner'
import CatalogMain from '../../components/CatalogMain'
import SalesListMain from '../../components/SalesListMain'
import { useDispatch } from 'react-redux'
import { fetchProducts } from '../../store/slice/productsSlice'
import s from './style.module.css'
import DiscountFormMain from '../../components/DiscountFormMain'
import SaleMainBanner from '../../components/SaleMainBanner'

export default function MainPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])



  return (
    <div className={s.container}>
      <SaleMainBanner />
      <CatalogMain />
      <DiscountFormMain />
      <SalesListMain />
    </div>
  )
}
