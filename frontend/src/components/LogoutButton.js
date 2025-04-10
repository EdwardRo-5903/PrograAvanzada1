import React from 'react';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shadow-md"
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;