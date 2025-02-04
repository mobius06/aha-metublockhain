import React from 'react';
import { Heart } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-semibold text-white">SecureHealth</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;