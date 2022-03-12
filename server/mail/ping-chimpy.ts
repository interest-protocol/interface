import mailchimp from './config';

const pingChimp = async (): Promise<void> => await mailchimp.ping.get();

export default pingChimp;
