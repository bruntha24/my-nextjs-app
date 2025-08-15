// components/atoms/Card.tsx
import React from "react";

// Props for the Card component
interface CardProps {
  children: React.ReactNode; // Anything you want to display inside the card
  className?: string; // Optional extra styles
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`
        bg-pureWhite      /* Card background color */
        shadow-md         /* Soft shadow for depth */
        rounded-xl        /* Rounded corners */
        p-6               /* Padding inside */
        border            /* Thin border */
        border-mediumGray /* Border color from Tailwind config */
        ${className}      /* Allow extra classes from props */
      `}
    >
      {children}
    </div>
  );
}
