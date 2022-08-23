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
    locales: ['en', 'pt'],
    defaultLocale: 'en',
    localeDetection: false,
  },
};
