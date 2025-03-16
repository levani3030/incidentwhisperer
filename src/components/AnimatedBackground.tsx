
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 animated-gradient opacity-40"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-medical-accent/10 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Additional subtle shapes */}
      <div className="absolute top-3/4 left-1/3 w-32 h-32 bg-primary/5 rounded-full filter blur-xl animate-pulse-subtle"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-secondary/10 rounded-full filter blur-2xl animate-pulse-subtle" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};

export default AnimatedBackground;
