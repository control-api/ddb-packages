import {BankName} from 'bank-sdk';

export type TokenFacet = 'Token';
export type InfoFacet = 'Info';

type Card = {
  id: string;
  cardNumber: string;
}

export type DDBTokenFacet = {
  hash_key: string;
  range_key: string;
  facetType: TokenFacet;
} & BankToken;

export type BankToken = {
  id: string;
  userId: string;
  token: string;
  bankName: BankName;
  createdAt: string;
}

export type DDBInfoFacet = {
  hash_key: string;
  range_key: string;
  facetType: InfoFacet;
} & BankInfo;

export type BankInfo = {
  id: string;
  userId: string;
  bankName: BankName;
  cardNumbers: Card[];
  createdAt: string;
}
