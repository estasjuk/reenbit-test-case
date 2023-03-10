import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import css from './CharactersListItem.module.css';

const CharactersListItem = ({ name, image, id, species }) => {
  const location = useLocation();
  return (
    <li className={css.MovieListItem}>
      <Link
        className={css.MovieListLink}
        to={`/characters/${id}`}
        state={{ from: location }}
      >
        <img
          className={css.MovieListImage}
          src={
            image
              ? `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`
              : 'https://ik.imagekit.io/tc8jxffbcvf/default-movie-portrait_EmJUj9Tda5wa.jpg?tr=fo-auto,di-'
          }
          alt={name}
          loading="lazy"
        />
        <h4>{name}</h4>
        <h4>{species}</h4>
      </Link>
    </li>
  );
};

export default CharactersListItem;

CharactersListItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  species: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
