import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./features/homeSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Details, SearchResult, Explore, PageNotFound } from "./pages";

function App() {
  const { url } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
