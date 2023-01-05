import { Component, ReactNode } from 'react';

import { Props, State } from './error-boundary.types';
import BoundaryMessage from './error-boundary-message';

class ErrorBoundary extends Component<Props, State> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): { error: Error } {
    return { error };
  }

  render = (): ReactNode =>
    this.state.error ? (
      <BoundaryMessage {...this.state} />
    ) : (
      this.props.children
    );
}

export default ErrorBoundary;
