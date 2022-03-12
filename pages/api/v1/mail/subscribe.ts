import { NextApiRequest, NextApiResponse } from 'next';

import { subscriber } from '../../../../server/mail';

const subscribe = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  if (request.method === 'GET') {
    await subscriber(request.query.email as string)
      .then((data) => response.status(200).json(JSON.stringify(data)))
      .catch((error) => response.status(401).send(error));
  }
};

export default subscribe;
