import { Component, ErrorInfo, ReactNode } from 'react';

import { GACategory } from '@/constants/google-analytics';
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
    logException(
      GACategory.Error,
      `${error.name}: ${error.message}; Stack: ${info.componentStack}`,
      ['views\\dapp\\components\\error-boundary\\index.tsx']
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
