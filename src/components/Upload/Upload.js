import React, { useState } from 'react';
import './Upload.css';

function Upload({ onFileSelect, error }) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className={`upload-container ${error ? 'error' : ''}`}>
      <label className="upload-label">
        <input
          type="file"
          className="upload-input"
          onChange={handleFileChange}
          aria-invalid={!!error}
          aria-describedby="file-upload-helper"
        />
        <span className="upload-button">Upload</span>
        <span id="file-upload-helper" className="file-name">{fileName || 'Upload your photo'}</span>
      </label>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default Upload;
