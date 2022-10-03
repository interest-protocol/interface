declare module 'toformat';
type CommonMessages = typeof import('../assets/messages/common/en-US.json');
type DexPoolFindMessages =
  typeof import('../assets/messages/dex/pool/find/en-US.json');
type DexPoolPairAddressMessages =
  typeof import('../assets/messages/dex/pool/pair-address/en-US.json');
type DexPoolMessages = typeof import('../assets/messages/dex/pool/en-US.json');
type DexSwapMessages = typeof import('../assets/messages/dex/swap/en-US.json');
type DineroMarketAddressMessages =
  typeof import('../assets/messages/dinero-market/address/en-US.json');
type DineroMarketMessages =
  typeof import('../assets/messages/dinero-market/en-US.json');
type EarnTokenAddressMessages =
  typeof import('../assets/messages/earn/token-address/en-US.json');
type EarnMessages = typeof import('../assets/messages/earn/en-US.json');
type VaultMessages = typeof import('../assets/messages/vault/en-US.json');
type VaultAddressMessages =
  typeof import('../assets/messages/vault/address/en-US.json');
type FaucetMessages = typeof import('../assets/messages/faucet/en-US.json');
type LandingPageMessages =
  typeof import('../assets/messages/landing-page/en-US.json');

declare interface IntlMessages
  extends CommonMessages,
    DexPoolFindMessages,
    DexPoolPairAddressMessages,
    DexSwapMessages,
    DexPoolMessages,
    DineroMarketAddressMessages,
    DineroMarketMessages,
    EarnTokenAddressMessages,
    EarnMessages,
    VaultMessages,
    FaucetMessages,
    VaultAddressMessages,
    LandingPageMessages {}
