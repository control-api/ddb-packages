import type {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {upsert} from '../ddb';

export async function updateOne<T>(params: DocumentClient.UpdateItemInput): Promise<T> {
  const {Attributes} = await upsert(params);

  return Attributes as T;
}
