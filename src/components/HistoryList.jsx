import React from 'react';
import PropTypes from 'prop-types';
import HistoryItem from './HistoryItem';

function HistoryList({ historyList, onHistoryItemClick }) {
  return historyList.map((historyItem) => {
    <ul>
      <HistoryItem
        historyItem={historyItem}
        onClick={() => onHistoryItemClick(historyItem)}
      />
    </ul>;
  });
}

HistoryList.propTypes = {
  historyList: PropTypes.array,
};

export default HistoryList;
