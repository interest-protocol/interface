import { LoadingState } from '@/constants';

import { isLoading } from './index';
const makeSut = () => ({ sut: isLoading });
describe('state', () => {
  it('Should be a true if loading state is updating or fetching', () => {
    const { sut } = makeSut();
    const result = sut(LoadingState.Idle);
    expect(result).toEqual(false);
  });
});
