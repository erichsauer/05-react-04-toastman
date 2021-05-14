import React from 'react';
import PropTypes from 'prop-types';

function Response({ response }) {
  return <div>{response}</div>;
}

Response.propTypes = {
  response: PropTypes.string.isRequired,
};

export default Response;
