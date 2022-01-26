import { SecureValue } from '../interfaces/secure-value';

enum EncryptedPassportElementTypeValues {
  personal_details,
  passport,
  internal_passport,
  driver_license,
  identity_card,
  address,
  utility_bill,
  bank_statement,
  rental_agreement,
  passport_registration,
  temporary_registration,
  phone_number,
  email,
}

export type EncryptedPassportElementType =
  keyof typeof EncryptedPassportElementTypeValues;

export type SecureDataKey = Exclude<
  EncryptedPassportElementType,
  'phone_number' | 'email'
>;

export type SecureValueKey = keyof SecureValue;
