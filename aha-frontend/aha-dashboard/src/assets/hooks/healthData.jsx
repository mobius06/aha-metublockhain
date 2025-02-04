import { useState } from 'react';
import { healthApi } from '../services/api';
import blockchainService from '../services/blockchain';

export const useHealthData = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    bloodPressure: '',
    heartRate: '',
    medicalHistory: ''
  });
  const [recommendations, setRecommendations] = useState(null);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Connect to blockchain
      const connected = await blockchainService.connect();
      if (!connected) {
        throw new Error('Failed to connect to blockchain');
      }

      // Encrypt data
      const encryptedData = await blockchainService.encryptData(formData);
      setIsEncrypted(true);

      // Submit to API
      const response = await healthApi.submitHealthData(formData);
      setRecommendations(response.data.recommendations);

      // Store encrypted data
      await healthApi.storeEncryptedData(encryptedData);
    } catch (err) {
      setError(err.message);
      setIsEncrypted(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    recommendations,
    isEncrypted,
    isLoading,
    error,
    handleSubmit
  };
};