import React from 'react';
import PropTypes from 'prop-types';

export default function Comment({ text, author }) {
  return (
    <div style={{ }}>
      { author.username }
      :
      {' '}
      { text }

    </div>
  );
}

// Prop validation using ESLint's prop object
Comment.propTypes = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
