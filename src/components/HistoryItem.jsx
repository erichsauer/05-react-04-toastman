import React from 'react';
import PropTypes from 'prop-types';

function HistoryItem({ historyItem }) {
  return <li>{historyItem}</li>;
}

HistoryItem.propTypes = {
  historyItem: PropTypes.string.isRequired,
};

export default HistoryItem;
