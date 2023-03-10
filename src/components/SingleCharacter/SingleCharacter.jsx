import { useState, useEffect } from 'react';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';

import Loader from 'shared/components/Loader/Loader';
import { getCharacterDetails } from 'shared/services/movies-api';

import css from './SingleCharacter.module.css';

const SingleCharacter = () => {
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { characterId } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from || '/';

  useEffect(() => {
    setLoading(true);
    const fetchCharacterDetails = async () => {
      try {
        const data = await getCharacterDetails(characterId);
        setCharacter(data);
      } catch ({ response }) {
        setError(response.data.message);
        alert(response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacterDetails();
  }, [characterId]);

  return (
    <div className={css.Wrapper}>
      {loading && <Loader />}
      <button className={css.GoBackBtn} onClick={() => navigate(from)}>
        Go back
      </button>
      <div className={css.MovieCard}>
        <img
          src={
            character?.image
              ? `https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg`
              : 'https://ik.imagekit.io/tc8jxffbcvf/default-movie-portrait_EmJUj9Tda5wa.jpg?tr=fo-auto,di-'
          }
          alt={character.name}
          width="300"
          loading="lazy"
        />
        <div>
          <h1 className={css.title}>{character?.name}</h1>
          <h3 className={css.title}>Informations:</h3>
          <h4>Gender: {character?.gender}</h4>
          <h4>Status: {character?.status}</h4>
          <h4>Species: {character?.species}</h4>
          <h4>Origin: {character.origin?.name}</h4>
          <h4>Type: {character.type !== '' ? character.type : 'Unknown'}</h4>
        </div>
      </div>

      <Outlet />
      {error && <p>Something goes wrong...</p>}
    </div>
  );
};

export default SingleCharacter;
