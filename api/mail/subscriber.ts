import mailchimp from './config';

const listId = process.env.MAIL_CHIMP_AUDIENCE_ID || '';

const subscriber = (email: string): Promise<void> =>
  mailchimp.lists.addListMember(listId, {
    email_address: email,
    status: 'subscribed',
  });

export default subscriber;
