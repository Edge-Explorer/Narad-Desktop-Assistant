import React, { useState } from 'react';

const ContactButtons: React.FC = () => {
  // States for inputs and responses
  const [showWhatsAppForm, setShowWhatsAppForm] = useState(false);
  const [showGitHubForm, setShowGitHubForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  
  // Form data states
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [whatsAppMessage, setWhatsAppMessage] = useState('');
  
  const [gitHubUsername, setGitHubUsername] = useState('');
  const [gitHubRepo, setGitHubRepo] = useState('');
  const [gitHubOwner, setGitHubOwner] = useState('');
  const [gitHubAction, setGitHubAction] = useState('list commits for repo');
  
  const [emailAddress, setEmailAddress] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  
  // Response state
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Server URL
  const SERVER_URL = 'http://localhost:5000';

  // WhatsApp handler - now uses the server
  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Format the WhatsApp command for the server
      const whatsAppCommand = `whatsapp: send "${whatsAppMessage}" to '${whatsAppNumber}'`;
      
      // Send to server
      const response = await fetch(`${SERVER_URL}/command`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command: whatsAppCommand })
      });
      
      const data = await response.json();
      setResponseMessage(data.response);
      
      // Only reset form if successful (you can check the response for success messages)
      if (data.response && !data.response.includes('Failed')) {
        setWhatsAppNumber('');
        setWhatsAppMessage('');
        setShowWhatsAppForm(false);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  // GitHub handler - now uses the server
  const handleGitHubSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Format the GitHub command based on the selected action
      let gitHubCommand = '';
      
      switch (gitHubAction) {
        case 'list commits for repo':
          gitHubCommand = `github: list commits for repo '${gitHubRepo}' by owner '${gitHubOwner || gitHubUsername}'`;
          break;
        case 'list repos for user':
          gitHubCommand = `github: list repos for user '${gitHubUsername}'`;
          break;
        case 'list my repos': 
          gitHubCommand = `github: list my repos`;
          break;
        case 'list commits by user':
          gitHubCommand = `github: list commits by user '${gitHubUsername}' in repo '${gitHubRepo}' by owner '${gitHubOwner || gitHubUsername}'`;
          break;
        default:
          gitHubCommand = `github: list repos for user '${gitHubUsername}'`;
      }
      
      // Send to server
      const response = await fetch(`${SERVER_URL}/command`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command: gitHubCommand })
      });
      
      const data = await response.json();
      setResponseMessage(data.response);
      
      // Only reset form if successful
      if (data.response && !data.response.includes('error')) {
        setGitHubUsername('');
        setGitHubRepo('');
        setGitHubOwner('');
        setShowGitHubForm(false);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Email handler - now uses the server
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Format the email command for the server
      const emailCommand = `email: send "${emailBody}" with subject "${emailSubject}" to '${emailAddress}'`;
      
      // Send to server
      const response = await fetch(`${SERVER_URL}/command`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command: emailCommand })
      });
      
      const data = await response.json();
      setResponseMessage(data.response);
      
      // Only reset form if successful
      if (data.response && data.response.includes('successfully')) {
        setEmailAddress('');
        setEmailSubject('');
        setEmailBody('');
        setShowEmailForm(false);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-section">
      <div className="contact-buttons">
        <button 
          onClick={() => setShowWhatsAppForm(!showWhatsAppForm)} 
          className="contact-button whatsapp"
        >
          WhatsApp
        </button>
        
        <button 
          onClick={() => setShowGitHubForm(!showGitHubForm)} 
          className="contact-button github"
        >
          GitHub
        </button>
        
        <button 
          onClick={() => setShowEmailForm(!showEmailForm)} 
          className="contact-button email"
        >
          Email
        </button>
      </div>

      {/* Response Area */}
      {responseMessage && (
        <div className="response-message">
          <h4>Response:</h4>
          <pre>{responseMessage}</pre>
        </div>
      )}
      
      {isLoading && <div className="loading">Processing request...</div>}

      {/* WhatsApp Form */}
      {showWhatsAppForm && (
        <div className="contact-form whatsapp-form">
          <h3>Send WhatsApp Message</h3>
          <form onSubmit={handleWhatsAppSubmit}>
            <div className="form-group">
              <label>Phone Number (with country code):</label>
              <input 
                type="text" 
                value={whatsAppNumber}
                onChange={(e) => setWhatsAppNumber(e.target.value)}
                placeholder="e.g. +911234567890"
                required
              />
            </div>
            <div className="form-group">
              <label>Message:</label>
              <textarea 
                value={whatsAppMessage}
                onChange={(e) => setWhatsAppMessage(e.target.value)}
                placeholder="Your message"
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" disabled={isLoading}>Send</button>
              <button type="button" onClick={() => setShowWhatsAppForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* GitHub Form */}
      {showGitHubForm && (
        <div className="contact-form github-form">
          <h3>GitHub Actions</h3>
          <form onSubmit={handleGitHubSubmit}>
            <div className="form-group">
              <label>Action:</label>
              <select 
                value={gitHubAction}
                onChange={(e) => setGitHubAction(e.target.value)}
                required
              >
                <option value="list commits for repo">List Commits For Repo</option>
                <option value="list repos for user">List Repos For User</option>
                <option value="list my repos">List My Repos</option>
                <option value="list commits by user">List Commits By User</option>
              </select>
            </div>
            
            {gitHubAction !== 'list my repos' && (
              <div className="form-group">
                <label>Username:</label>
                <input 
                  type="text" 
                  value={gitHubUsername}
                  onChange={(e) => setGitHubUsername(e.target.value)}
                  placeholder="GitHub username"
                  required={gitHubAction !== 'list my repos'}
                />
              </div>
            )}
            
            {(gitHubAction === 'list commits for repo' || gitHubAction === 'list commits by user') && (
              <>
                <div className="form-group">
                  <label>Repository:</label>
                  <input 
                    type="text" 
                    value={gitHubRepo}
                    onChange={(e) => setGitHubRepo(e.target.value)}
                    placeholder="Repository name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Owner (optional, defaults to username):</label>
                  <input 
                    type="text" 
                    value={gitHubOwner}
                    onChange={(e) => setGitHubOwner(e.target.value)}
                    placeholder="Repository owner"
                  />
                </div>
              </>
            )}
            
            <div className="form-actions">
              <button type="submit" disabled={isLoading}>Submit</button>
              <button type="button" onClick={() => setShowGitHubForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Email Form */}
      {showEmailForm && (
        <div className="contact-form email-form">
          <h3>Send Email</h3>
          <form onSubmit={handleEmailSubmit}>
            <div className="form-group">
              <label>Email Address:</label>
              <input 
                type="email" 
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Subject:</label>
              <input 
                type="text" 
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Email subject"
                required
              />
            </div>
            <div className="form-group">
              <label>Message:</label>
              <textarea 
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Your message"
                rows={5}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" disabled={isLoading}>Send Email</button>
              <button type="button" onClick={() => setShowEmailForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContactButtons;