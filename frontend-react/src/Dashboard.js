import React, { useEffect, useState } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Dashboard({ token, logout }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${BACKEND_URL}/protected`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Token inválido');
        return res.json();
      })
      .then(data => setUser(data.logged_in_as))
      .catch(() => setError('Acceso no autorizado'));
  }, [token]);

  if (error) return (
    <div>
      <p style={{color: 'red'}}>{error}</p>
      <button onClick={logout}>Volver al login</button>
    </div>
  );

  if (!user) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Bienvenido, {user}</h2>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default Dashboard;
