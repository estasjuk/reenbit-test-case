import PropTypes from 'prop-types';

import css from './CharactersFind.module.css';

const CharactersFind = ({ handleChange }) => {
  return (
    <div className={css.formGroup}>
      <input
        className={css.input}
        name="filter"
        onChange={handleChange}
        placeholder="Filter by name..."
      />
    </div>
  );
};

export default CharactersFind;

CharactersFind.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
