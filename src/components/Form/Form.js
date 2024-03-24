import React, { useState, useEffect } from 'react';
import Input from '../Input/Input';
import Upload from '../Upload/Upload';
import { getToken, registerUser, getPositions } from '../../api/api';
import successImage from '../../assets/success-image.svg';
import './Form.css';

function Form({ onSuccessfulSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position_id: '',
    photo: null
  });
  const [positions, setPositions] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPositions() {
      try {
        const response = await getPositions();
        if (response.success) {
          setPositions(response.positions);
        } else {
          throw new Error('Failed to load positions');
        }
      } catch (error) {
        console.error('Fetching positions failed:', error);
      }
    }

    fetchPositions();
  }, []);

  useEffect(() => {
    const isValid = formData.name && formData.email && formData.phone && formData.position_id && formData.photo;
    setIsFormValid(isValid);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePositionChange = (e) => {
    setFormData({ ...formData, position_id: e.target.value });
  };

  const handleFileUpload = (file) => {
    setFormData({ ...formData, photo: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;
  
    setIsSubmitting(true);
    setError('');
  
    try {
      const tokenResponse = await getToken();
      if (!tokenResponse.success) throw new Error('Failed to retrieve token.');
  
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position_id', formData.position_id);
      formDataToSend.append('photo', formData.photo);
  
      const userResponse = await registerUser(formDataToSend, tokenResponse.token);
      if (!userResponse.success) {
        if (userResponse.message && userResponse.fails) {
          const errors = Object.values(userResponse.fails).map(fail => fail.join('. ')).join(' ');
          throw new Error(`Validation failed: ${errors}`);
        } else {
          throw new Error(userResponse.message || 'Registration failed');
        }
      }
  
      setIsSubmitted(true);
      setIsSubmitting(false);
      if(onSuccessfulSubmit) onSuccessfulSubmit();
    } catch (err) {
      setError(err.message || 'An error occurred');
      setIsSubmitting(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="form-submitted">
        <h2>User successfully registered</h2>
        <img src={successImage} alt="Success" />
      </div>
    );
  }

  return (
    <div className="form-container">
      {error && <div className="error-message">{error}</div>}
      <form className="registration-form" onSubmit={handleSubmit}>
        <Input name="name" label="Name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
        <Input name="email" label="Email" value={formData.email} onChange={handleInputChange} placeholder="email@example.com" type="email" />
        <Input name="phone" label="Phone" value={formData.phone} onChange={handleInputChange} placeholder="+380 XX XXX XX XX" type="tel" />
        <div className="position-selector">
          {positions.map((position) => (
            <label key={position.id}>
              <input
                type="radio"
                name="position_id"
                value={position.id}
                checked={formData.position_id === position.id.toString()}
                onChange={handlePositionChange}
              />
              {position.name}
            </label>
          ))}
        </div>
        <Upload onFileSelect={handleFileUpload} />
        <button type="submit" disabled={!isFormValid || isSubmitting} className={`submit-button ${isFormValid ? "active" : "inactive"}`}>Sign up</button>
      </form>
    </div>
  );
}

export default Form;

