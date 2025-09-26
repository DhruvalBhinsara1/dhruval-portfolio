import React from 'react';

export const ExcelIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} width={32} height={32} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#217346"/>
    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">XLS</text>
  </svg>
);

export const PowerBIIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} width={32} height={32} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#F2C811"/>
    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#222" fontWeight="bold">BI</text>
  </svg>
);

export const PythonIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} width={32} height={32} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#3776AB"/>
    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">Py</text>
  </svg>
);

export const SQLIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} width={32} height={32} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#336791"/>
    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">SQL</text>
  </svg>
);

export const TableauIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} width={32} height={32} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#E97627"/>
    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">Tb</text>
  </svg>
);
