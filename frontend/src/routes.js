import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import DetailView from "./pages/DetailView";
import Search from "./pages/DetailView"; 
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/detail/:date" element={<DetailView />} />
      <Route path="/search/:date" element={<DetailView />} />
    </Routes>
  );
};
export default AppRoutes;
