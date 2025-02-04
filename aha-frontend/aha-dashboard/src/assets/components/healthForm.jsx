import React from 'react';
import { useHealthData } from '../hooks/useHealthData';

const HealthForm = () => {
  const {
    formData,
    setFormData,
    isLoading,
    error,
    handleSubmit
  } = useHealthData();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Input field configuration for easy maintenance and consistent styling
  const inputFields = [
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      placeholder: 'Years',
      min: 0,
      max: 120
    },
    {
      name: 'weight',
      label: 'Weight',
      type: 'number',
      placeholder: 'kg',
      min: 0,
      max: 500
    },
    {
      name: 'height',
      label: 'Height',
      type: 'number',
      placeholder: 'cm',
      min: 0,
      max: 300
    },
    {
      name: 'bloodPressure',
      label: 'Blood Pressure',
      type: 'text',
      placeholder: '120/80',
      pattern: '\\d{2,3}\\/\\d{2,3}'
    },
    {
      name: 'heartRate',
      label: 'Heart Rate',
      type: 'number',
      placeholder: 'BPM',
      min: 0,
      max: 220
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Enter Health Data</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {inputFields.map(field => (
            <div key={field.name}>
              <label 
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
                pattern={field.pattern}
                required
              />
            </div>
          ))}
        </div>

        <div>
          <label 
            htmlFor="medicalHistory"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Medical History
          </label>
          <textarea
            id="medicalHistory"
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Any relevant medical conditions"
            rows="3"
          />
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 
            hover:from-purple-600 hover:to-pink-600 text-white py-3 px-4 rounded-md
            transition-all duration-200 ease-in-out
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            transform hover:scale-[1.02] active:scale-[0.98]`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            'Encrypt & Get Recommendations'
          )}
        </button>
      </form>
    </div>
  );
};

export default HealthForm;