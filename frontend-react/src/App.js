import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [token, setToken] = useState(null);

  const logout = () => setToken(null);

  return (
    <div className="App">
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <Dashboard token={token} logout={logout} />
      )}
    </div>
  );
}

export default App;
