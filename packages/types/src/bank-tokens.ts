import {BankName} from 'bank-sdk';

export type TokenFacet = 'Token';

export type DDBTokenFacet = {
  hash_key: string;
  range_key: string;
  facetType: TokenFacet;
} & BankToken;

export type BankToken = {
  userId: string;
  token: string;
  bankName: BankName;
}
