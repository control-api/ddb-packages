import type {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {get} from '../ddb';

export async function findOne<T>(params: DocumentClient.GetItemInput): Promise<T> {
  const {Item} = await get(params);

  return Item as T;
}
