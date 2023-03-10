import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const getAllCharacters = async () => {
  const { data } = await instance.get('/character');
  return data;
};

export const getCharacterDetails = async characterId => {
  const { data } = await instance.get(`/character/${characterId}`);
  return data;
};

export const searchCharactersByName = async (query, page = 1) => {
  const { data } = await instance.get('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return data;
};
