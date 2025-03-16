
import React from 'react';
import { Activity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex justify-center items-center animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Activity size={28} className="text-medical-accent" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse-subtle"></span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            IncidentWhisperer
          </h1>
          <p className="text-sm text-muted-foreground">
            AI-Powered IT Support
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
