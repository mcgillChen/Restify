import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear local storage
    navigate('/login');
    localStorage.clear();
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('user_id');
  };

  return (
      <Link id="nav3" onClick={handleLogout} to="/login">
        Logout
      </Link>
  );
};

export default LogoutButton;
