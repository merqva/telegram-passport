import { RequestedFields, SecureValue } from './interfaces';

export type EncryptedPassportElementType = keyof RequestedFields;

export type Indexable<T = unknown> = {
  [key: string]: T;
};

export type SecureDataKey = Exclude<
  EncryptedPassportElementType,
  'phone_number' | 'email' | 'nonce'
>;

export type SecureValueKey = keyof SecureValue;

export type StringOrBuffer = string | Buffer;
