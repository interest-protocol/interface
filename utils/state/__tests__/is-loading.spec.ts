import { LoadingState } from '@/constants';

import { isLoading } from '..';

describe(isLoading.name, () => {
  it('Should be a true if loading state is updating', () => {
    const result = isLoading(LoadingState.Updating);
    expect(result).toEqual(true);
  });

  it('Should be passed if loading state is no updating', () => {
    const result = isLoading(LoadingState.Fetching);
    expect(result).not.toEqual(true);
  });
});
