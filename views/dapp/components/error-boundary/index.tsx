import { Component, ErrorInfo, ReactNode } from 'react';

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
    console.warn('> error :::', error);
    console.warn('> error info :::', info);
  }

  render = (): ReactNode =>
    this.state.error ? (
      <BoundaryMessage {...this.state} />
    ) : (
      this.props.children
    );
}

export default ErrorBoundary;
