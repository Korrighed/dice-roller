import React from 'react';
// @ts-ignore
import '../styles/DiceButton.css';

interface DiceButtonProps {
  type: string;
  onClick: (type: string) => void;
}

const buttonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  background: 'none',
  border: 'none',
  padding: '0',
  cursor: 'pointer',
  transition: 'transform 0.15s ease',
};

const hoverStyle: React.CSSProperties = {
  ...buttonStyle,
  transform: 'scale(1.15)',
};

const getDiceShape = (type: string) => {
  switch (type) {
    case 'd4':
      return (
        <svg viewBox="0 0 50 50">
          <polygon points="25,5 45,40 5,40" fill="#009845" stroke="#333" strokeWidth="2"/>
          <text x="25" y="32" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#fff">4</text>
        </svg>
      );
    case 'd6':
      return (
        <svg viewBox="0 0 50 50">
          <rect x="8" y="8" width="34" height="34" fill="#9a9a9a" stroke="#333" strokeWidth="2"/>
          <text x="25" y="32" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#fff">6</text>
        </svg>
      );
    case 'd8':
      return (
        <svg viewBox="0 0 50 50">
          <polygon points="25,3 47,25 25,47 3,25" fill="#979235" stroke="#333" strokeWidth="2"/>
          <text x="25" y="32" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#fff">8</text>
        </svg>
      );
    case 'd10':
      return (
        <svg viewBox="0 0 50 50">
          <polygon points="25,5 45,25 25,45 5,25" fill="#4b9593" stroke="#333" strokeWidth="2"/>
          <text x="25" y="32" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">10</text>
        </svg>
      );
    case 'd12':
      return (
        <svg viewBox="0 0 50 50">
          <polygon points="25,3 45,15 48,35 25,47 2,35 5,15" fill="#8f538a" stroke="#333" strokeWidth="2"/>
          <text x="25" y="32" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">12</text>
        </svg>
      );
    case 'd20':
      return (
        <svg viewBox="0 0 50 50">
          <polygon points="25,2 48,18 40,45 10,45 2,18" fill="#90282c" stroke="#333" strokeWidth="2"/>
          <text x="25" y="32" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">20</text>
        </svg>
      );
    case 'd100':
      return (
        <svg viewBox="0 0 50 50">
          <polygon points="25,5 45,25 25,45 5,25" fill="#4b9593" stroke="#333" strokeWidth="2"/>
          <text x="25" y="32" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">100</text>
        </svg>
      );
    default:
      return null;
  }
};

export default function DiceButton({ type, onClick }: DiceButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      className="dice-button"
      style={isHovered ? hoverStyle : buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(type)}
      title={`Ajouter ${type}`}
    >
      {getDiceShape(type)}
    </button>
  );
}
