import React, { useEffect, useState } from 'react';

const DebugInfo = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      right: 0,
      padding: '10px',
      background: '#f0f0f0',
      border: '1px solid #ccc',
      zIndex: 1000
    }}>
      <h4>Connection Debug</h4>
      <p><strong>Frontend Status:</strong> {online ? 'Online' : 'Offline'}</p>
    </div>
  );
};

export default DebugInfo;