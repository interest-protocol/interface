import { createContext, FC, useState } from 'react';

import { IRerenderContext } from './rerender.types';

const rerenderContext = createContext({} as IRerenderContext);

export const RerenderProvider: FC = ({ children }) => {
  const { Provider } = rerenderContext;
  const [rerender, setRerender] = useState({});

  const fireRerender = () => setRerender({});

  return <Provider value={{ rerender, fireRerender }}>{children}</Provider>;
};

export default rerenderContext;
