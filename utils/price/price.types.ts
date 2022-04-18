import { Web3Provider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';

export type TGetBTCPrice = (provider: Web3Provider) => Promise<BigNumber>;
