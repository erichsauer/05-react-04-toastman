import React from 'react';
import PropTypes from 'prop-types';

export default function HistoryItem({ historyItem, onHistoryItemClick }) {
  return <p onClick={() => onHistoryItemClick(historyItem)}>{historyItem}</p>;
}

HistoryItem.propTypes = {
  historyItem: PropTypes.string.isRequired,
};
