import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAIL_CHIMP_API_KEY,
  server: 'us14',
});

export default mailchimp;
