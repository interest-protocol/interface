import { Component, ErrorInfo, ReactNode } from 'react';

import { logGenericEvent } from '@/utils/analytics';

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
    logGenericEvent(
      `${error.name}: ${error.message}; Stack: ${info.componentStack}`
    );
  }

  render = (): ReactNode =>
    this.state.error ? (
      <BoundaryMessage {...this.state} />
    ) : (
      this.props.children
    );
}

export default ErrorBoundary;
