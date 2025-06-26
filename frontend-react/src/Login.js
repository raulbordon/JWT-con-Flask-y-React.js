import React, { useState } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.access_token);
      } else {
        setError(data.msg || 'Error en login');
      }
    } catch (err) {
      setError('Error en la conexión');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        /><br/>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br/>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
