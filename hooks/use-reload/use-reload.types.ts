import { IEmptyObject } from '../../interface';

export type UseReload = () => {
  reload: IEmptyObject;
  reloader: () => void;
};
