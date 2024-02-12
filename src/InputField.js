import React from 'react';

const InputField = ({ label, value, onClear }) => {
  return (
    <div className='is-flex'>
      <label className="subtitle is-info is-ellipsis mr-2" style={{ width: '40%' }}>
        {label}
      </label>
      <input
        className="input is-rounded is-info mr-2"
        type="text"
        value={value}
        readOnly
        placeholder={`Drop your ${label.toLowerCase()} column`}
      />
      <button className="button is-info is-small mt-1 is-hovered" onClick={onClear}>
        Clear
      </button>
    </div>
  );
};

export default InputField;
