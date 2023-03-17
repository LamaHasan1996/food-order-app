import { memo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home, RestaurantDetails, Restaurant } from "./pages";

function Routing() {
  return (
    <Routes>
      <Route path={`/`} element={<Navigate replace to="/home" />} />
      <Route path={`/home`} element={<Home />} />
      <Route path={`/restaurants`} element={<Restaurant />} />
      <Route path={`/restaurant/:alias`} element={<RestaurantDetails />} />
    </Routes>
  );
}

export default memo(Routing);
