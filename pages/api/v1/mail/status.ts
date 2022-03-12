import { NextApiRequest, NextApiResponse } from 'next';

import { pingChimpy } from '../../../../server/mail';

const status = async (
  _request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  try {
    await pingChimpy();
    response.status(200).json({ status: 'OK', message: 'MailChimp is alive' });
  } catch (error) {
    response.status(405).send(error);
  }
};

export default status;
