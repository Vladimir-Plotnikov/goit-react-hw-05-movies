import { Routes, Route } from "react-router-dom";
import Home from "pages/Home/Home";
import Movies from "pages/Movies/Movies";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import MoviesDelails from "pages/MoviesDetails/MoviesDetails";
import Reviews from "./components/Reviews/Reviews";
import Cast from "./components/Cast/Cast";
import { GlobalStyle } from "GlobalStyle";

// import About from "path/to/pages/About"
// import Products from "path/to/pages/Products"

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
        </Route>
        </Routes>
    </div>
  )
}

