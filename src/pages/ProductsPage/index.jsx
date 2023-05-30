import React from 'react'
// import AllProducts from '../../components/AllProducts'
import s from './style.module.css'
// import ProductsList from '../../components/ProductsList'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux';
import ProductItem from '../../components/ProductItem';
import { useEffect } from 'react';
import { useState } from 'react';
import FilterProd from '../../components/FilterProd';


export default function ProductsPage() {

  const params = useParams();
  const productsAll = useSelector(state => state.products.list) 
  const categoriesAll = useSelector(state => state.categories.list);

  const [products, setProducts] = useState(productsAll)
  const [categories, setCategory] = useState([])
  const [showDiscount, setShowDiscount] = useState(false)


 useEffect(()=> {
  if (params.id) {
    const prodCategory = productsAll.filter((prod) => (prod.categoryId === +params.id))
    const thisCategory = categoriesAll.find((categ) => (categ.id === +params.id))
    // console.log(thisCategory);
    setProducts(prodCategory)
    setCategory(thisCategory)
  } else if(params.sale){
    const salesProducts = productsAll.filter(prod => prod.discont_price)
    setProducts(salesProducts)
    setCategory([])
  } else if(products === undefined){
    return <h4>Loading...</h4>
  } else {
    setProducts(productsAll)
    setCategory([])
  }
 }, [params , productsAll, categoriesAll])
// console.log(products);

const handleDiscountChange = (e) => {
  setShowDiscount(e.target.checked)
}



  return (
    <>
      <div className={s.wrapper}>
        <h2 className={s.title}>
        {params.id ? categories?.title || "Loading..." :
        params.sale ? "Products with sale" :
        "All products"}
        </h2>

        <FilterProd showDiscount={showDiscount} onDiscountChange={handleDiscountChange} />

        <div className={s.products}>
          {
            products
            .filter(item => !showDiscount || item.discont_price)
            .filter(item => item.showByTitle)
            .filter(item => item.showFilteredPrice)
            .map(item => <ProductItem key={item.id} {...item} />)
          }
        </div>
      
      </div>
    </>
  )
}
