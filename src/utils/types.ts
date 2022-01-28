import { RequestedFields } from '..';
import { SecureValue } from '../interfaces/secure-value';

export type StrBuff = string | Buffer;

export type EncryptedPassportElementType = keyof RequestedFields;

export type SecureDataKey = Exclude<
  EncryptedPassportElementType,
  'phone_number' | 'email'
>;

export type SecureValueKey = keyof SecureValue;
