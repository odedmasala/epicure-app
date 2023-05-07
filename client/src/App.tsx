import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer, Navbar } from "./layouts";
import {
  RestaurantsPage,
  HomePage,
  RestaurantPage,
  ChefPage,
  CheckOut,
} from "./pages";

import "./app.scss";
import { selectBag, useAppSelector } from "./store";

const App: React.FC = () => {
  const location = useLocation();
  return (
    <div className="html-container">
      {location.pathname != "/checkout" && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/:restId" element={<RestaurantPage />} />
        <Route path="/chef" element={<ChefPage />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
      {location.pathname != "/checkout" && <Footer />}
    </div>
  );
};

export default App;
