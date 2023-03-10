import { useState, useEffect } from 'react';
import CharactersList from 'components/CharactersList/CharactersList';
//import Searchbar from 'components/CharacterSearch/Searchbar/Searchbar';
import CharactersFind from 'components/CharactersFind/CharactersFind';
import Loader from 'shared/components/Loader/Loader';

import { getAllCharacters } from '../../shared/services/movies-api';

const AllCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  const handleFind = ({ target }) => setFilter(target.value);

  const getFilteredCharacters = () => {
    if (!filter) {
      return characters;
    }

    const normalizedFind = filter.toLowerCase().trim();
    const result = characters.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFind);
    });

    return result;
  };

  const peoples = getFilteredCharacters();

  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        setLoading(true);
        const data = await getAllCharacters();
        setCharacters(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCharacters();
  }, [setLoading, setCharacters, setError]);

  return (
    <div>
      {/* <Searchbar handleChange={handleFind} /> */}
      <CharactersFind handleChange={handleFind} />
      <CharactersList characters={peoples} />
      {error && <p>Something goes wrong...</p>}
      {loading && <Loader />}
    </div>
  );
};

export default AllCharacters;
