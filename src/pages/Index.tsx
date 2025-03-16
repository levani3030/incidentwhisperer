
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/ChatInterface';
import { Info, Monitor, AlertTriangle, Clock } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl mb-8 text-center animate-slide-down">
          <div className="inline-block bg-medical-blue/30 text-xs font-medium py-1 px-3 rounded-full mb-3">
            AI-POWERED SUPPORT
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Simplified IT Support for Medical Clinics
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered system streamlines IT incident reporting for medical professionals, 
            ensuring your technology issues are resolved quickly and efficiently.
          </p>
        </div>

        {/* Features section */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="glass-panel hover-lift p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-medical-blue/30 flex items-center justify-center mb-4">
              <Monitor size={24} className="text-medical-accent" />
            </div>
            <h3 className="text-lg font-medium mb-2">Intelligent Assistance</h3>
            <p className="text-sm text-muted-foreground">
              Our AI chatbot guides you through the entire incident reporting process, ensuring all critical information is captured.
            </p>
          </div>
          
          <div className="glass-panel hover-lift p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-medical-pink/40 flex items-center justify-center mb-4">
              <AlertTriangle size={24} className="text-accent" />
            </div>
            <h3 className="text-lg font-medium mb-2">Priority-Based Routing</h3>
            <p className="text-sm text-muted-foreground">
              Issues are automatically prioritized and routed to the appropriate IT support staff based on urgency and type.
            </p>
          </div>
          
          <div className="glass-panel hover-lift p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-medical-pink/40 flex items-center justify-center mb-4">
              <Info size={24} className="text-accent" />
            </div>
            <h3 className="text-lg font-medium mb-2">Detailed Reporting</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive incident data collection ensures IT staff have all the information they need to resolve issues quickly.
            </p>
          </div>
          
          <div className="glass-panel hover-lift p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-medical-blue/30 flex items-center justify-center mb-4">
              <Clock size={24} className="text-medical-accent" />
            </div>
            <h3 className="text-lg font-medium mb-2">Real-Time Updates</h3>
            <p className="text-sm text-muted-foreground">
              Receive timely updates on the status of your support request as it progresses through the resolution workflow.
            </p>
          </div>
        </div>
        
        {/* Chat interface */}
        <div className="w-full animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <ChatInterface />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
