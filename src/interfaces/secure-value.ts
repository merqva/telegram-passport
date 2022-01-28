import { DataCredentials, FileCredentials } from '.';

/**
 * This object represents the credentials required to decrypt encrypted values.
 * All fields are optional and depend on the type of fields that were requested
 * @see [SecureValue](https://core.telegram.org/passport#securevalue)
 * @interface SecureValue
 */
export interface SecureValue {
  /**
   * Optional. Credentials for encrypted Telegram Passport data.
   * Available for "personal_details", "passport", "driver_license", "identity_card",
   * "internal_passport" and "address" types
   */
  data?: DataCredentials;

  /**
   * Optional. Credentials for an encrypted document's front side.
   * Available for "passport", "driver_license", "identity_card" and "internal_passport"
   */
  front_side?: FileCredentials;

  /**
   * Optional. Credentials for an encrypted document's reverse side.
   * Available for "driver_license" and "identity_card"
   */
  reverse_side?: FileCredentials;

  /**
   * Optional. Credentials for an encrypted selfie of the user with a document.
   * Available for "passport", "driver_license", "identity_card" and "internal_passport"
   */
  selfie?: FileCredentials;

  /**
   * Optional. Credentials for an encrypted translation of the document.
   * Available for "passport", "driver_license", "identity_card", "internal_passport", "utility_bill",
   * "bank_statement", "rental_agreement", "passport_registration" and "temporary_registration"
   */
  translation?: Array<FileCredentials>;

  /**
   * Optional. Credentials for encrypted files.
   * Available for "utility_bill", "bank_statement", "rental_agreement", "passport_registration"
   * and "temporary_registration" types
   */
  files?: Array<FileCredentials>;
}
