import { Component, ErrorInfo, ReactNode } from 'react';

import { GAAction } from '@/constants/google-analytics';
import { logException } from '@/utils/analytics';

import { Props, State } from './error-boundary.types';
import BoundaryMessage from './error-boundary-message';

class ErrorBoundary extends Component<Props, State> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): { error: Error } {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    logException({
      action: GAAction.ComponentDidCatch,
      label: `${error.name}: ${error.message}; Stack: ${info.componentStack}`,
      trackerName: ['views/dapp/components/error-boundary/index.tsx'],
    });
  }

  render = (): ReactNode =>
    this.state.error ? (
      <BoundaryMessage {...this.state} />
    ) : (
      this.props.children
    );
}

export default ErrorBoundary;
