import React from 'react';
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  LightBulbIcon,
  ScaleIcon,
  DocumentTextIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export type CalloutType =
  | 'info'
  | 'warning'
  | 'danger'
  | 'success'
  | 'stat'
  | 'case-study'
  | 'legal'
  | 'tip';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const calloutConfig = {
  info: {
    containerClass: 'bg-blue-50 border-l-4 border-safety-blue-800 text-blue-900',
    icon: InformationCircleIcon,
    iconClass: 'text-safety-blue-800',
  },
  warning: {
    containerClass: 'bg-warning-yellow-50 border-l-4 border-warning-yellow-500 text-warning-yellow-900',
    icon: ExclamationTriangleIcon,
    iconClass: 'text-warning-yellow-600',
  },
  danger: {
    containerClass: 'bg-danger-red-50 border-l-4 border-danger-red-600 text-danger-red-900',
    icon: XCircleIcon,
    iconClass: 'text-danger-red-600',
  },
  success: {
    containerClass: 'bg-success-green-50 border-l-4 border-success-green-600 text-success-green-900',
    icon: CheckCircleIcon,
    iconClass: 'text-success-green-600',
  },
  stat: {
    containerClass: 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-safety-blue-800',
    icon: SparklesIcon,
    iconClass: 'text-safety-blue-800',
  },
  'case-study': {
    containerClass: 'bg-gray-50 border-l-4 border-gray-400 text-gray-900',
    icon: DocumentTextIcon,
    iconClass: 'text-gray-600',
  },
  legal: {
    containerClass: 'bg-gray-50 border-l-4 border-gray-500 text-gray-900',
    icon: ScaleIcon,
    iconClass: 'text-gray-700',
  },
  tip: {
    containerClass: 'bg-green-50 border-l-4 border-success-green-500 text-green-900',
    icon: LightBulbIcon,
    iconClass: 'text-success-green-600',
  },
};

export function Callout({ type, title, children, className = '' }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`
        ${config.containerClass}
        p-4 rounded-r-lg my-6 animate-fade-in-up
        ${className}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${config.iconClass}`} aria-hidden="true" />
        <div className="flex-1">
          {title && (
            <h4 className="font-bold mb-2 text-lg">
              {title}
            </h4>
          )}
          <div className="prose prose-sm max-w-none [&_strong]:font-bold">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Specialized callout components for convenience
export function InfoCallout({ title, children }: Omit<CalloutProps, 'type'>) {
  return <Callout type="info" title={title}>{children}</Callout>;
}

export function WarningCallout({ title, children }: Omit<CalloutProps, 'type'>) {
  return <Callout type="warning" title={title}>{children}</Callout>;
}

export function DangerCallout({ title, children }: Omit<CalloutProps, 'type'>) {
  return <Callout type="danger" title={title}>{children}</Callout>;
}

export function SuccessCallout({ title, children }: Omit<CalloutProps, 'type'>) {
  return <Callout type="success" title={title}>{children}</Callout>;
}

export function StatCallout({ children }: Omit<CalloutProps, 'type' | 'title'>) {
  return <Callout type="stat">{children}</Callout>;
}

export function TipCallout({ title, children }: Omit<CalloutProps, 'type'>) {
  return <Callout type="tip" title={title}>{children}</Callout>;
}
