import React from 'react';
import PropTypes from 'prop-types';

export default function Controls({
  onFormSubmit,
  onInputChange,
  onURLClear,
  onCheckboxToggle,
  selectedMethod,
  enteredURL,
  enteredJSON,
  apiKey,
  enteredKey,
  enteredKeyHeader,
}) {
  return (
    <form onSubmit={onFormSubmit} autoComplete="off">
      <div>
        <input
          required={true}
          name="enteredURL"
          type="url"
          placeholder="https://localtoast..."
          onChange={onInputChange}
          value={enteredURL}
        />
        {enteredURL && <span onClick={onURLClear}>✕</span>}
      </div>
      {apiKey && enteredURL && (
        <div>
          <input
            name="enteredKeyHeader"
            type="text"
            placeholder="HEADER"
            onChange={onInputChange}
            value={enteredKeyHeader}
          />
          <input
            name="enteredKey"
            type="text"
            placeholder="KEY"
            onChange={onInputChange}
            value={enteredKey}
          />
        </div>
      )}
      {enteredURL && (
        <div>
          <label>
            <input
              type="radio"
              value="GET"
              name="selectedMethod"
              onChange={onInputChange}
              checked={selectedMethod === 'GET'}
            />
            <img src="get.png" alt="fancy toast" />
          </label>
          <label>
            <input
              type="radio"
              value="POST"
              name="selectedMethod"
              onChange={onInputChange}
              checked={selectedMethod === 'POST'}
            />
            <img src="post.png" alt="make toast" />
          </label>
          <label>
            <input
              type="radio"
              value="PATCH"
              name="selectedMethod"
              onChange={onInputChange}
              checked={selectedMethod === 'PATCH'}
            />
            <img src="patch.png" alt="new toast" />
          </label>
          <label>
            <input
              type="radio"
              value="PUT"
              name="selectedMethod"
              onChange={onInputChange}
              checked={selectedMethod === 'PUT'}
            />
            <img src="put.png" alt="add jam" />
          </label>
          <label>
            <input
              type="radio"
              value="DELETE"
              name="selectedMethod"
              onChange={onInputChange}
              checked={selectedMethod === 'DELETE'}
            />
            <img src="delete.png" alt="burn toast" />
          </label>
          <label>
            <input
              type="checkbox"
              name="selectedMethod"
              onChange={onCheckboxToggle}
              checked={apiKey}
            />
            <img src="key.png" alt="unlock bread box" />
          </label>
        </div>
      )}
      {selectedMethod && (
        <>
          {selectedMethod !== 'GET' && selectedMethod !== 'DELETE' && (
            <div>
              <textarea
                name="enteredJSON"
                placeholder="enter valid json"
                onChange={onInputChange}
                value={enteredJSON}
              />
            </div>
          )}
          <button name={selectedMethod}>{selectedMethod}</button>
        </>
      )}
    </form>
  );
}

Controls.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  selectedMethod: PropTypes.string.isRequired,
  enteredURL: PropTypes.string.isRequired,
};
