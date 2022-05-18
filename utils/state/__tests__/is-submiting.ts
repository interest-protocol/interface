import { LoadingState } from '@/constants';

import { isSubmitting } from '..';

describe(isSubmitting.name, () => {
  it('Should be a true if loading state is submitting', () => {
    const result = isSubmitting(LoadingState.Submitting);
    expect(result).toEqual(true);
  });
});
