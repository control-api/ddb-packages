import type {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {remove} from '../ddb';

export async function deleteOne<T>(
    params: Omit<DocumentClient.DeleteItemInput, 'ReturnValues'>,
): Promise<T | undefined> {
  const {Attributes} = await remove(params);

  return Attributes as T;
}
