// components/atoms/Title.tsx
import React from "react";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => {
  return (
    <h1
      className={`text-3xl font-bold text-charcoalGray mb-6 ${className || ""}`}
    >
      {children}
    </h1>
  );
};

export default Title;
