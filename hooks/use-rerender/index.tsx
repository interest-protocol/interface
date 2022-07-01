import { useContext } from 'react';

import rerenderContext from '../../context/rerender';

const useRerender = () => useContext(rerenderContext);

export default useRerender;
