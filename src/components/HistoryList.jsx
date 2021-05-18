import React from 'react';
import PropTypes from 'prop-types';
import HistoryItem from './HistoryItem';

export default function HistoryList({ historyList, onHistoryItemClick }) {
  return (
    <footer>
      {historyList.map((historyItem) => {
        return (
          <HistoryItem
            key={historyItem}
            historyItem={historyItem}
            onHistoryItemClick={onHistoryItemClick}
          />
        );
      })}
    </footer>
  );
}

HistoryList.propTypes = {
  historyList: PropTypes.array,
};
