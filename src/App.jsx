import { Routes, Route, Navigate } from "react-router-dom";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { GlobalStyle } from "GlobalStyle";

import Home from "pages/Home/Home";
import Movies from "pages/Movies/Movies";
import MoviesDelails from "pages/MoviesDetails/MoviesDetails";

import Reviews from "./components/Reviews/Reviews";
import Cast from "./components/Cast/Cast";

export const App = () => {
  return (
    <div>
      <GlobalStyle/>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />}/>
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MoviesDelails />}>
            <Route path="cast" element ={<Cast/>}/>
            <Route path="reviews" element ={<Reviews/>}/>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        </Routes>
    </div>
  )
}

