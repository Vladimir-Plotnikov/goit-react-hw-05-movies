import { useLocation } from 'react-router-dom';
import defaultPicture from '../../images/default-movie.jpeg';
import {Image, Item} from '../MovieList/MovieList.styled'

export const MovieList = ({ items }) => {
  const location = useLocation();

  return (
    <ul>
      {items.map(({ id, poster_path, title }) => (
        <li key={id}>
          <Item to={`/movies/${id}`} state={{ from: location }}>
            <Image
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : defaultPicture
              }
              alt={title}
            />
            <div>
              <p>{title}</p>
            </div>
          </Item>
        </li>
      ))}
    </ul>
  );
};
