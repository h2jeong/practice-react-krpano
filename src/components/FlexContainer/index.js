import React from 'react';

export const HStack = ({ className = '', justifyContent, children }) => {
  return (
    <div className={`flex-conainer h-stack ${className}`} style={{ justifyContent }}>
      {children}
    </div>
  );
};
export const VStack = ({ className = '', justifyContent, children }) => {
  return (
    <div className={`flex-container v-stack ${className}`} style={{ justifyContent }}>
      {children}
    </div>
  );
};
export const FlexItem = ({ flex, children }) => {
  return (
    <div className="flex-item" style={{ flex }}>
      {children}
    </div>
  );
};
