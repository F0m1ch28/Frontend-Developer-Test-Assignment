import React from 'react';
import './Button.css';

function Button({ type, label, onClick, disabled }) {
  const className = `button ${type} ${disabled ? 'disabled' : ''}`;
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;
