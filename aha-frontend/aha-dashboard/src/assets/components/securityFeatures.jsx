import React from 'react';
import { Shield, Database, Lock } from 'lucide-react';

const SecurityFeatures = () => {
  const features = [
    {
      icon: Shield,
      title: 'EigenLayer Security',
      description: 'Your health data is secured through ETH staking',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Database,
      title: 'Decentralized Storage',
      description: 'Data encrypted and distributed across blockchain',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Lock,
      title: 'Lit Protocol Access',
      description: 'Controlled sharing with encrypted access',
      gradient: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${feature.gradient} text-white rounded-lg p-6
            transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
        >
          <div className="flex items-center mb-4">
            <feature.icon className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-semibold">{feature.title}</h3>
          </div>
          <p className="text-white/90">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SecurityFeatures;