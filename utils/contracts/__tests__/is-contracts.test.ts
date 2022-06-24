import { CHAIN_ID, CONTRACTS, TOKEN_SYMBOL } from '@/sdk';

import {
  getAddressWithSymbol,
  getBTCAddress,
  getCasaDePapelAddress,
  getDineroMarketAddress,
  getDNRAddress,
  getIntAddress,
  getMultiCallV2Address,
} from '../..';

describe(getMultiCallV2Address.name, () => {
  it('Should be return the address from MULTI_CALL', () => {
    expect(getMultiCallV2Address(CHAIN_ID.BNB_TEST_NET)).toEqual(
      CONTRACTS.MULTI_CALL[CHAIN_ID.BNB_TEST_NET]
    );
  });
  it('Should be return the address from CASA_DE_PAPEL', () => {
    expect(getCasaDePapelAddress(CHAIN_ID.BNB_TEST_NET)).toEqual(
      CONTRACTS.CASA_DE_PAPEL[CHAIN_ID.BNB_TEST_NET]
    );
  });
  it('Should be return an address from DineroMarketAddress', () => {
    expect(
      getDineroMarketAddress(CHAIN_ID.BNB_TEST_NET, TOKEN_SYMBOL.BTC)
    ).toEqual('0x926f8FB78f5769a3D724A8ffC7058528C86939E1');
  });
  it('Should be return an address from BTC', () => {
    expect(getBTCAddress(CHAIN_ID.BNB_TEST_NET)).toEqual(
      CONTRACTS.BTC[CHAIN_ID.BNB_TEST_NET]
    );
  });
  it('Should be return an address from INT', () => {
    expect(getIntAddress(CHAIN_ID.BNB_TEST_NET)).toEqual(
      CONTRACTS.INT[CHAIN_ID.BNB_TEST_NET]
    );
  });
  it('Should be return an address from DNR', () => {
    expect(getDNRAddress(CHAIN_ID.BNB_TEST_NET)).toEqual(
      CONTRACTS.DNR[CHAIN_ID.BNB_TEST_NET]
    );
  });
  it('Should be return an address when is informed the CHAIN_ID and TOKEN', () => {
    expect(
      getAddressWithSymbol(CHAIN_ID.BNB_TEST_NET)(TOKEN_SYMBOL.DNR)
    ).toEqual(CONTRACTS.DNR[CHAIN_ID.BNB_TEST_NET]);
  });
});
