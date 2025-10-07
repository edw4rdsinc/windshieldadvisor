import React from 'react';

export type Severity = 'safe' | 'caution' | 'critical' | 'info';

interface SeverityBadgeProps {
  severity: Severity;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

const severityConfig = {
  safe: {
    bg: 'bg-success-green-100',
    text: 'text-success-green-800',
    border: 'border-success-green-600',
    icon: '🟢',
    label: 'Safe',
  },
  caution: {
    bg: 'bg-warning-yellow-100',
    text: 'text-warning-yellow-800',
    border: 'border-warning-yellow-600',
    icon: '🟡',
    label: 'Caution',
  },
  critical: {
    bg: 'bg-danger-red-100',
    text: 'text-danger-red-800',
    border: 'border-danger-red-600',
    icon: '🔴',
    label: 'Critical',
  },
  info: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-600',
    icon: 'ℹ️',
    label: 'Info',
  },
};

const sizeConfig = {
  sm: {
    padding: 'px-2 py-1',
    text: 'text-xs',
    icon: 'text-sm',
  },
  md: {
    padding: 'px-3 py-1.5',
    text: 'text-sm',
    icon: 'text-base',
  },
  lg: {
    padding: 'px-4 py-2',
    text: 'text-base',
    icon: 'text-lg',
  },
};

export function SeverityBadge({
  severity,
  size = 'md',
  showIcon = true,
  className = '',
}: SeverityBadgeProps) {
  const config = severityConfig[severity];
  const sizeClass = sizeConfig[size];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-semibold
        ${config.bg} ${config.text} border-2 ${config.border}
        ${sizeClass.padding} ${sizeClass.text}
        ${className}
      `}
    >
      {showIcon && (
        <span className={sizeClass.icon} aria-hidden="true">
          {config.icon}
        </span>
      )}
      <span>{config.label}</span>
    </span>
  );
}

// Severity banner for results pages
interface SeverityBannerProps {
  severity: Severity;
  title: string;
  className?: string;
}

export function SeverityBanner({ severity, title, className = '' }: SeverityBannerProps) {
  const config = severityConfig[severity];

  const bannerBgConfig = {
    safe: 'bg-success-green-600',
    caution: 'bg-warning-yellow-500',
    critical: 'bg-danger-red-600',
    info: 'bg-safety-blue-800',
  };

  return (
    <div
      className={`
        ${bannerBgConfig[severity]}
        text-white p-6 md:p-8 rounded-lg text-center
        animate-fade-in-down
        ${className}
      `}
      role="status"
      aria-live="polite"
    >
      <div className="text-5xl md:text-6xl mb-3 animate-scale-in">
        {config.icon}
      </div>
      <h1 className="text-2xl md:text-3xl font-bold">
        {title}
      </h1>
    </div>
  );
}
