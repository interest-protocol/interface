import { NextApiRequest } from 'next';

import { subscriber } from '../../../../api/mail';

const subscribe = async (request: NextApiRequest): Promise<void> => {
  return await subscriber(request.query.email as string);
};

export default subscribe;
