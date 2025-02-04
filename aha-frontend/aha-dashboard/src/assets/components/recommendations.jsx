import React from 'react';
import { Activity, Heart, Sun, Globe } from 'lucide-react';

const Recommendations = ({ recommendations, isEncrypted }) => {
  const getIcon = (key) => {
    switch(key) {
      case 'diet':
        return Sun;
      case 'exercise':
        return Activity;
      case 'lifestyle':
        return Globe;
      default:
        return Heart;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Health Recommendations</h2>
      
      {recommendations ? (
        <div className="space-y-4">
          {Object.entries(recommendations).map(([key, value]) => {
            const Icon = getIcon(key);
            return (
              <div 
                key={key}
                className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg
                  transform transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center mb-2">
                  <Icon className="h-5 w-5 text-purple-600 mr-2" />
                  <h4 className="font-medium capitalize text-purple-700">{key}</h4>
                </div>
                <p className="text-gray-600 ml-7">{value}</p>
              </div>
            );
          })}
          
          {isEncrypted && (
            <div className="flex items-center justify-center p-3 mt-4 bg-green-50 text-green-700 rounded-lg">
              <Shield className="h-5 w-5 mr-2" />
              <span>Data Encrypted and Secured on EigenLayer</span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <Lock className="h-12 w-12 mx-auto mb-3 text-gray-400" />
          <p>Submit your health data to receive encrypted recommendations</p>
        </div>
      )}
    </div>
  );
};

export default Recommendations;