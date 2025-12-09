import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiStatus = () => {
  const [status, setStatus] = useState('checking');
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    const url = process.env.REACT_APP_API_URL || 'http://localhost:5001';
    setApiUrl(url);

    try {
      const response = await axios.get(url, { timeout: 5000 });
      if (response.data) {
        setStatus('connected');
      }
    } catch (error) {
      console.error('API Status Check Failed:', error);
      setStatus('failed');
    }
  };

  // Only show in development or if there's an error
  if (process.env.NODE_ENV === 'production' && status === 'connected') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '15px 20px',
      borderRadius: '8px',
      background: status === 'connected' ? '#d4edda' : status === 'failed' ? '#f8d7da' : '#fff3cd',
      color: status === 'connected' ? '#155724' : status === 'failed' ? '#721c24' : '#856404',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 9999,
      fontSize: '14px',
      maxWidth: '300px'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        {status === 'checking' && '🔄 Checking API...'}
        {status === 'connected' && '✅ API Connected'}
        {status === 'failed' && '❌ API Connection Failed'}
      </div>
      <div style={{ fontSize: '12px', wordBreak: 'break-all' }}>
        API URL: {apiUrl}
      </div>
      {status === 'failed' && (
        <div style={{ fontSize: '12px', marginTop: '8px' }}>
          <strong>Fix:</strong>
          <ol style={{ margin: '5px 0', paddingLeft: '20px' }}>
            <li>Deploy backend to Railway</li>
            <li>Add REACT_APP_API_URL to Vercel</li>
            <li>Redeploy frontend</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default ApiStatus;
