import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function PostRender({ text, author }) {
  return (
    <div style={{ }}>
      { author }
      :
      {' '}
      { text }

    </div>
  );
}

// Prop validation using ESLint's prop object
PostRender.propTypes = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
