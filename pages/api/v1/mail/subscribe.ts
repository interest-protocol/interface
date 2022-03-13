import { NextApiRequest, NextApiResponse } from 'next';

import { subscriber } from '../../../../server/mail';

const subscribe = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  try {
    if (request.method === 'GET') {
      const data = await subscriber(request.query.email as string);
      const jsonData = JSON.stringify(data);
      response.status(200).json(jsonData);
    }
  } catch (error: any) {
    const errorData = JSON.parse(error.response.text);
    response.status(error.status).send(errorData);
  }
};

export default subscribe;
