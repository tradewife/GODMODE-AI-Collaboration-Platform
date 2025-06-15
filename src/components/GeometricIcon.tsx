import React from 'react';

interface GeometricIconProps {
  className?: string;
  size?: number;
}

const GeometricIcon: React.FC<GeometricIconProps> = ({ className = '', size = 24 }) => {
  return (
    <div 
      className={`relative ${className} cursor-pointer select-none`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="text-current"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        {/* Geometric torus pattern - simplified version */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30) * (Math.PI / 180);
          const x1 = 50 + 35 * Math.cos(angle);
          const y1 = 50 + 35 * Math.sin(angle);
          const x2 = 50 + 45 * Math.cos(angle);
          const y2 = 50 + 45 * Math.sin(angle);
          
          return (
            <g key={i}>
              <ellipse
                cx="50"
                cy="50"
                rx={15 + i * 2}
                ry={15 + i * 2}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity={0.6 - i * 0.04}
                transform={`rotate(${i * 15} 50 50)`}
              />
            </g>
          );
        })}
        
        {/* Inner pattern */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          return (
            <circle
              key={`inner-${i}`}
              cx="50"
              cy="50"
              r={8 + i * 3}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              opacity={0.8 - i * 0.08}
            />
          );
        })}
        
        {/* Center point */}
        <circle
          cx="50"
          cy="50"
          r="2"
          fill="currentColor"
          opacity="0.9"
        />
      </svg>
    </div>
  );
};

export default GeometricIcon;