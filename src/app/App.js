import { Route, Routes } from "react-router-dom";

import './App.scss';
import { BasketPage } from "../pages/basket/Basket";
import { FavsPage } from "../pages/favs/FavsPage";
import { HomePage } from "../pages/home/HomePage";
import { ProductPage } from "../pages/product/ProductPage";
import { CatalogPage } from "../pages/catalog/CatalogPage";
import { SearchPage } from "../pages/search/SearchPage";
import { LkPage } from '../pages/lk/LkPage';
import { Notfound } from '../pages/notfound/NotFound';
import { OrderPage } from "../pages/order/OrderPage";
import { GlobalLoader } from "../components/loaders/GlobalLoader/GlobalLoader";
import { HelpPage } from "../pages/help/HelpPage";
import { AboutPage } from "../pages/about/AboutPage";


function App() {
  return (
    <>
      <GlobalLoader />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="basket" element={<BasketPage />} />
        <Route path="favorite" element={<FavsPage />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path='/catalog/:catalogTitle' element={<CatalogPage />} />
        <Route path='/search/:catalogName/:searchText' element={<SearchPage />} />
        <Route path='lk' element={<LkPage />} />
        <Route path='help' element={<HelpPage />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='*' element={<Notfound />}/>
      </Routes>
    </>
  );
}

export default App;
