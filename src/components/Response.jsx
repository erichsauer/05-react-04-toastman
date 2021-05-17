import React from 'react';
import PropTypes from 'prop-types';
import JSONPretty from 'react-json-pretty';
import JSONPrettyTheme from 'react-json-pretty/dist/adventure_time';

function Response({ responseJSON, onBack }) {
  return (
    <main>
      <JSONPretty
        id="json-pretty"
        data={responseJSON}
        theme={JSONPrettyTheme}
      ></JSONPretty>
      <button onClick={onBack}>GO BACK</button>
    </main>
  );
}

Response.propTypes = {
  responseJSON: PropTypes.object,
};

export default Response;
