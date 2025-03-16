
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 md:px-8 text-center text-sm text-muted-foreground animate-fade-in">
      <p>© {new Date().getFullYear()} IncidentWhisperer · AI-Powered IT Support System</p>
    </footer>
  );
};

export default Footer;
