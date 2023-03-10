import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from 'shared/components/Loader/Loader';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const SingleCharacterPage = lazy(() =>
  import('pages/SingleCharacterPage/SingleCharacterPage')
);
const CharacterSearchPage = lazy(() =>
  import('pages/MoviesSearchPage/MoviesSearchPage')
);

export const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/characters/:characterId"
            element={<SingleCharacterPage />}
          />
          <Route path="/movies" element={<CharacterSearchPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
};
