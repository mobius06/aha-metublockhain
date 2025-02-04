import React from 'react';
import Navigation from './components/navigation';
import SecurityBanner from './components/securityBanner';
import SecurityFeatures from './components/securityFeatures';
import HealthForm from './components/healthForm';
import Recommendations from './components/recommendations';
import { useHealthData } from './hooks/healthData';

const App = () => {
  const { recommendations, isEncrypted } = healthData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />
      <SecurityBanner />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <SecurityFeatures />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HealthForm />
          <Recommendations 
            recommendations={recommendations}
            isEncrypted={isEncrypted}
          />
        </div>
      </main>

      {/* Optional Footer */}
      <footer className="mt-12 py-6 text-center text-gray-600">
        <p>Secured by Blockchain Technology</p>
      </footer>
    </div>
  );
};

export default App;