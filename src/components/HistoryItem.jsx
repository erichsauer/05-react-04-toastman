import React from 'react';
import PropTypes from 'prop-types';

export default function HistoryItem({ historyItem }) {
  return <li>{historyItem}</li>;
}

HistoryItem.propTypes = {
  historyItem: PropTypes.string.isRequired,
};
