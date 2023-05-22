import { Route, Routes } from "react-router-dom";
import Footer from "../Footer";
import NotFoundPage from "../../pages/NotFoundPage";
import Header from "../Header";
import BasketPage from "../../pages/BasketPage";
import CategoriesPage from "../../pages/CategoriesPage";
import ProductsPage from "../../pages/ProductsPage";
import ProductDescriptionPage from "../../pages/ProductDescriptionPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/slice/productsSlice";
import { fetchCategories } from "../../store/slice/categoriesSlice";
import MainPage from "../../pages/MainPage";






function App() {
  const dispatch = useDispatch();

 useEffect(()=> {
  dispatch(fetchProducts());
  dispatch(fetchCategories());
 }, [dispatch])

  return (
    <div>
      <Header />
      <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
     
      <Route path="/basket" element={<BasketPage />} />
      <Route path='/products/all' element={<ProductsPage />} />
      <Route path="/products/categories/:id" element={<ProductsPage/>}/>
      <Route path='/products/:sale' element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductDescriptionPage />} />
      
      <Route path='/*' element={<NotFoundPage />} />
      {/* <Route path="/categories/:category" element={<TestCategoryProdPage />} /> */}
       {/* <Route path="/products/:title" element={<ProductsPage/>}/> */}
      
     </Routes>

      <Footer />

    </div>
  );
}

export default App;

/* <Route path="/" element={<MainPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/products/:title" element={<ProductsPage/>}/>
      <Route path="/basket" element={<BasketPage />} />
      <Route path='/products/all' element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDescriptionPage />} />
      <Route path='/sales' element={<ProductsPage />} />
     
      <Route path="/categories/:category" element={<TestCategoryProdPage />} />
      
      <Route path='/*' element={<NotFoundPage />} /> */