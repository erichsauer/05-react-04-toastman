import React from 'react';

export default function Header({ onLogoClick }) {
  return (
    <header onClick={onLogoClick}>
      <img src="logo.png" className="logo" alt="toastman" />
    </header>
  );
}
