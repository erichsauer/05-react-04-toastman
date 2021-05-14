import React from 'react';
import PropTypes from 'prop-types';

export function Controls({
  onFormSubmit,
  onInputChange,
  selectedMethod,
  enteredURL,
}) {
  return (
    <form onSubmit={onFormSubmit}>
      <input
        name="enteredURL"
        type="url"
        placeholder="enter url"
        onChange={onInputChange}
        value={enteredURL}
      />
      <label>
        <input
          type="radio"
          value="GET"
          name="selectedMethod"
          onChange={onInputChange}
          checked={selectedMethod === 'GET'}
        />
        ORDER TOAST
      </label>
      <label>
        <input
          type="radio"
          value="POST"
          name="selectedMethod"
          onChange={onInputChange}
          checked={selectedMethod === 'POST'}
        />
        MAKE TOAST
      </label>
      <label>
        <input
          type="radio"
          value="PUT"
          name="selectedMethod"
          onChange={onInputChange}
          checked={selectedMethod === 'PUT'}
        />
        ADD BUTTER & JAM
      </label>
      <label>
        <input
          type="radio"
          value="PATCH"
          name="selectedMethod"
          onChange={onInputChange}
          checked={selectedMethod === 'PATCH'}
        />
        REPLACE TOAST
      </label>
      <label>
        <input
          type="radio"
          value="DELETE"
          name="selectedMethod"
          onChange={onInputChange}
          checked={selectedMethod === 'DELETE'}
        />
        EAT TOAST
      </label>
      <button>TOASTER</button>
    </form>
  );
}

Controls.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  selectedMethod: PropTypes.string.isRequired,
  enteredURL: PropTypes.string.isRequired,
};
