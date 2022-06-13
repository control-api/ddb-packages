export type UserFacet = 'User';

export type DDBUserFacet = {
  hash_key: string;
  range_key: string;
  GSI1HK: string;
  GSI1RK: string;
  facetType: UserFacet;
  id: string;
  userName: string;
  password: string;
  email: string;
  createdAt: string;
}

export type User = {
  id: string;
  userName: string;
  password: string;
  email: string;
  createdAt: string;
}

