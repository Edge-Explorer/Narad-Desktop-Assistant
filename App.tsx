import React, { useState, useEffect } from 'react';
import './App.css';
import ContactButtons from './ContactButtons';
import AIAssistant from './AIAssistantChat';

const App: React.FC = () => {
  const [serverStatus, setServerStatus] = useState<'online' | 'offline'>('offline');
  const [activeTab, setActiveTab] = useState<'assistant' | 'contact'>('assistant');
  
  // Check if server is online when component mounts
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/ping');
        if (response.ok) {
          setServerStatus('online');
        } else {
          setServerStatus('offline');
        }
      } catch (error) {
        setServerStatus('offline');
      }
    };
    
    checkServerStatus();
    // Check server status every 30 seconds
    const interval = setInterval(checkServerStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>NARAD AI</h1>
        <p>Server: <span className={serverStatus}>{serverStatus}</span></p>
      </header>
      
      <div className="tab-navigation">
        <button 
          className={activeTab === 'assistant' ? 'active' : ''} 
          onClick={() => setActiveTab('assistant')}
        >
          AI Assistant
        </button>
        <button 
          className={activeTab === 'contact' ? 'active' : ''} 
          onClick={() => setActiveTab('contact')}
        >
          Contact Tools
        </button>
      </div>
      
      <main>
        {activeTab === 'assistant' && <AIAssistant />}
        {activeTab === 'contact' && <ContactButtons />}
      </main>
    </div>
  );
};

export default App;
