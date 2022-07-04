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
};
