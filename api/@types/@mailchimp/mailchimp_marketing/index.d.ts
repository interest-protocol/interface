/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare module '@mailchimp/mailchimp_marketing' {
  type Config = {
    apiKey?: string;
    accessToken?: string;
    server?: string;
  };

  type AddListMemberOptions = {
    skipMergeValidation: boolean;
  };

  export type AddListMemberBody = {
    email_address: string;
    status:
      | 'subscribed'
      | 'unsubscribed'
      | 'cleaned'
      | 'pending'
      | 'transactional';
    merge_fields?: { [key: string]: any };
  };

  export default {
    setConfig: (config: Config): void => {},
    ping: { get: (): any => {} },
    lists: {
      addListMember: (
        listId: string,
        body: AddListMemberBody,
        opts?: AddListMemberOptions
      ): Promise<void> => {},
    },
  };
}
