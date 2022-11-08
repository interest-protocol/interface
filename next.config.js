module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/dapp',
        destination: '/dapp/dex',
        permanent: true,
      },
    ];
  },
  i18n: {
    locales: ['en-US', 'pt-PT', 'pt-BR'],
    defaultLocale: 'en-US',
    localeDetection: true,
  },
};
