import React from 'react';
import './Input.css';

function Input({ label, value, onChange, placeholder, type, error, name }) {
  return (
    <div className="input-container">
      {label && <label className="input-label" htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        className={`input-field ${error ? 'input-error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
      {error && <span className="input-helper-text">{error}</span>}
    </div>
  );
}

export default Input;
