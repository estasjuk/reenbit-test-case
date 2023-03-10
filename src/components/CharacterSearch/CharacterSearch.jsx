import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import css from './CharacterSearch.module.css';
import Searchbar from './Searchbar/Searchbar';
import CharactersList from 'components/CharactersList/CharactersList';
import { searchCharactersByName } from 'shared/services/movies-api';
import Loader from '../../shared/components/Loader/Loader';
import Button from 'shared/components/Button/Button/Button';

const CharacterSearch = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');
  const page = searchParams.get('page');

  const onSearchCharacters = search => {
    setSearchParams({ search, page: 1 });
    setCharacters([]);
  };

  useEffect(() => {
    const checkData = ({ page, total_results, results }) => {
      const PER_PAGE = 20;
      if (page === 1 && total_results > PER_PAGE) {
        setIsLoadMore(true);
      }
      if (total_results === 0) {
        setIsLoadMore(false);
      } else if (results.length < PER_PAGE) {
        alert('Oops! This is a finish, try something else');
        setIsLoadMore(false);
      }
    };
    if (search) {
      const fetchCharacters = async () => {
        try {
          setLoading(true);
          const data = await searchCharactersByName(search, page);
          setCharacters(prevCharacters => [...prevCharacters, ...data.results]);
          checkData(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchCharacters();
    }
  }, [search, page]);

  const loadMore = useCallback(() => {
    setSearchParams({ search, page: Number(page) + 1 });
  }, [page, search, setSearchParams]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSearchCharacters} />
      {characters.length !== 0 && <CharactersList movies={characters} />}
      {loading && <Loader />}
      {error && <p>Something goes wrong...</p>}
      {isLoadMore && <Button onClick={loadMore} />}
    </div>
  );
};

export default CharacterSearch;
