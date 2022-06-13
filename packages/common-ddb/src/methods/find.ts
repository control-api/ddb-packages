import type {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {query} from '../ddb';

export async function find<T>(params: DocumentClient.QueryInput): Promise<T[]> {
  const {Items} = await query(params);

  return Items as T[];
}
