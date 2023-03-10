import PropTypes from 'prop-types';
import { memo } from 'react';

import css from './CharactersList.module.css';
import CharactersListItem from './CharactersListItem/CharactersListItem';

const CharactersList = ({ characters }) => {
  const sortedCharacters = characters.sort((firstCharacter, secondCharacter) =>
    firstCharacter.name.localeCompare(secondCharacter.name)
  );
  const elements = sortedCharacters.map(({ id, name, species, image }) => (
    <CharactersListItem
      key={id}
      id={id}
      name={name}
      species={species}
      image={image}
    />
  ));

  return (
    <div className={css.wrapper}>
      <ul className={css.MovieList}>{elements}</ul>
    </div>
  );
};

export default memo(CharactersList);

CharactersList.defaultProps = {
  characters: [],
};

CharactersList.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      species: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ),
};
