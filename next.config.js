module.exports = {
  async redirects() {
    return [
      {
        source: '/dapp',
        destination: '/dapp/dex',
        permanent: true,
      },
    ];
  },
  experimental: {
    newNextLinkBehavior: true,
  },
  i18n: {
    // providing the locales supported by your application
    locales: ['en-US', 'pt-BR'],
    //  default locale used when the non-locale paths are visited
    defaultLocale: 'en-US',
  },
};
