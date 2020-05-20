import React from 'react';
import './Logo.css';

interface LogoProps {
  small?: boolean;
}

const Logo = ({ small = false }: LogoProps) => {
  if (small) {
    return (
      <h1 className="logo logo--small">a</h1>
    );
  }
  return (
    <h1 className="logo">accountable</h1>
  );
};

export default Logo;