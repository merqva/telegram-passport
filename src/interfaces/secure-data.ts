import { SecureValue } from './secure-value';

/**
 * This object represents the credentials required to decrypt encrypted data.
 * All fields are optional and depend on fields that were requested.
 * @see [SecureData](https://core.telegram.org/passport#securedata)
 * @interface SecureData
 */
export interface SecureData {
  /**
   * Optional. Credentials for encrypted personal details
   */
  personal_details?: SecureValue;

  /**
   * Optional. Credentials for encrypted passport
   */
  passport?: SecureValue;

  /**
   * Optional. Credentials for encrypted internal passport
   */
  internal_passport?: SecureValue;

  /**
   * Optional. Credentials for encrypted driver license
   */
  driver_license?: SecureValue;

  /**
   * Optional. Credentials for encrypted ID card
   */
  identity_card?: SecureValue;

  /**
   * Optional. Credentials for encrypted residential address
   */
  address?: SecureValue;

  /**
   * Optional. Credentials for encrypted utility bill
   */
  utility_bill?: SecureValue;

  /**
   * Optional. Credentials for encrypted bank statement
   */
  bank_statement?: SecureValue;

  /**
   * Optional. Credentials for encrypted rental agreement
   */
  rental_agreement?: SecureValue;

  /**
   * Optional. Credentials for encrypted registration from internal passport
   */
  passport_registration?: SecureValue;

  /**
   * Optional. Credentials for encrypted temporary registration
   */
  temporary_registration?: SecureValue;
}
