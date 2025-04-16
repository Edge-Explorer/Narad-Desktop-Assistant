// src/App.tsx
import React, { useEffect, useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [serverStatus, setServerStatus] = useState<'online' | 'offline'>('offline');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const toggleTheme = () => setDarkMode(!darkMode);

  const checkServer = async () => {
    try {
      const res = await fetch('http://localhost:5000/ping'); // Change to your backend URL
      setServerStatus(res.ok ? 'online' : 'offline');
    } catch {
      setServerStatus('offline');
    }
  };

  const sendQuestion = async () => {
    if (!question) return;
    try {
      const res = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setResponse(data.answer || 'No answer received.');
    } catch {
      setResponse('Failed to connect to server.');
    }
  };

  useEffect(() => {
    checkServer();
    const interval = setInterval(checkServer, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <header>
        <h1>NARAD AI</h1>
        <button onClick={toggleTheme}>
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <div className="status">
        Server: <span className={serverStatus}>{serverStatus}</span>
      </div>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask me anything..."
      />
      <button onClick={sendQuestion}>Ask</button>

      <div className="response">
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default App;

