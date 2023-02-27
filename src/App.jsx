import { Routes, Route, Navigate } from "react-router-dom";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { GlobalStyle } from "GlobalStyle";
import { lazy } from "react";

const Home = lazy(() => import("pages/Home/Home"));
const Movies = lazy(() => import("pages/Movies/Movies"));
const MoviesDelails = lazy(() => import("pages/MoviesDetails/MoviesDetails"));

const Reviews = lazy(() => import("./components/Reviews/Reviews"));
const Cast = lazy(() => import("./components/Cast/Cast"));

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

