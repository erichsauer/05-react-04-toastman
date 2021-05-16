import React from 'react';
import PropTypes from 'prop-types';
import HistoryItem from './HistoryItem';

export default function HistoryList({ historyList, onHistoryItemClick }) {
  return (
    <footer>
      {historyList.length !== 0 ? (
        historyList.map((historyItem) => {
          return (
            <HistoryItem
              key={historyItem}
              historyItem={historyItem}
              onHistoryItemClick={onHistoryItemClick}
            />
          );
        })
      ) : (
        <p>
          <h2>Welcome!</h2>
          <br />
          Enter a full API URL to begin.
          <br /> Click on a history item to edit or remove.
          <br />
          The Toastman logo resets the app.
          <br />
          Happy fetching!
        </p>
      )}
    </footer>
  );
}

HistoryList.propTypes = {
  historyList: PropTypes.array,
};
