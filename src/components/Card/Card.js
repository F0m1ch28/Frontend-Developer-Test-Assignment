import React from 'react';
import './Card.css';

function Card({ avatarUrl, name, position, email, phone }) {
  return (
    <div className="card">
      <div className="avatar-container">
        <img src={avatarUrl} alt={`${name}'s avatar`} className="avatar" loading="lazy" />
      </div>
      <div className="info">
        <h3 className="name">{name}</h3>
        <p className="position">{position}</p>
        <p className="email">{email}</p>
        <p className="phone">{phone}</p>
      </div>
    </div>
  );
}

export default Card;
