import { memo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home, RestaurantDetails, Restaurant, Cart } from "./pages";

function Routing() {
  return (
    <Routes>
      <Route path={`/`} element={<Navigate replace to="/home" />} />
      <Route path={`/home`} element={<Home />} />
      <Route path={`/restaurants`} element={<Restaurant />} />
      <Route path={`/restaurant/:alias`} element={<RestaurantDetails />} />
      <Route path={`/cart`} element={<Cart />} />
    </Routes>
  );
}

export default memo(Routing);
