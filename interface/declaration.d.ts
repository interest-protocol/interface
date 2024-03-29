declare module 'toformat';
type CommonMessages = typeof import('../assets/messages/common/en-US.json');
type DexPoolFindMessages =
  typeof import('../assets/messages/dex/pool/find/en-US.json');
type DexPoolDetailsMessages =
  typeof import('../assets/messages/dex/pool/details/en-US.json');
type DexPoolMessages = typeof import('../assets/messages/dex/pool/en-US.json');
type DexSwapMessages = typeof import('../assets/messages/dex/swap/en-US.json');
type DineroMarketAddressMessages =
  typeof import('../assets/messages/dinero-market/address/en-US.json');
type DineroMarketMessages =
  typeof import('../assets/messages/dinero-market/en-US.json');
type SyntheticsMarketMessages =
  typeof import('../assets/messages/synthetics-market/en-US.json');
type SyntheticsMarketAddressMessages =
  typeof import('../assets/messages/synthetics-market/address/en-US.json');
type FarmsDetailsMessages =
  typeof import('../assets/messages/farms/details/en-US.json');
type FarmsMessages = typeof import('../assets/messages/farms/en-US.json');
type VaultsMessages = typeof import('../assets/messages/vaults/en-US.json');
type DineroVaultMessages =
  typeof import('../assets/messages/dinero-vault/en-US.json');
type FaucetMessages = typeof import('../assets/messages/faucet/en-US.json');
type LandingPageMessages =
  typeof import('../assets/messages/landing-page/en-US.json');

declare interface IntlMessages
  extends CommonMessages,
    DexPoolFindMessages,
    DexPoolDetailsMessages,
    DexSwapMessages,
    DexPoolMessages,
    DineroMarketAddressMessages,
    DineroMarketMessages,
    FarmsDetailsMessages,
    FarmsMessages,
    VaultsMessages,
    FaucetMessages,
    DineroVaultMessages,
    LandingPageMessages,
    SyntheticsMarketMessages,
    SyntheticsMarketAddressMessages {}
