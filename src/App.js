import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setLoading(true);

      // Crear FormData y enviar la imagen al servidor Flask
      const formData = new FormData();
      formData.append('image', file);

      fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setDiagnosis(data.diagnosis);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setDiagnosis('Error al procesar la imagen.');
          setLoading(false);
        });
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Plataforma de Diagnóstico con IA</h1>
      </header>
      <div className="content">
        <div className="upload-container">
          <label htmlFor="file-upload" className="custom-file-upload">
            Seleccionar Imagen
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        {selectedImage && (
          <div className="image-preview">
            <img src={selectedImage} alt="Imagen seleccionada" />
          </div>
        )}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Procesando imagen...</p>
          </div>
        )}
        {diagnosis && (
          <div className="diagnosis">
            <h2>Diagnóstico:</h2>
            <p>{diagnosis}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
