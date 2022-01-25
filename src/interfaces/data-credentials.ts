/**
 * These credentials can be used to decrypt encrypted data from the data field in EncryptedPassportElement.
 * @see [DataCredentials](https://core.telegram.org/passport#datacredentials)
 * @interface DataCredentials
 */
export interface DataCredentials {
  /**
   * Checksum of encrypted data
   */
  data_hash: string;

  /**
   * Secret of encrypted data
   */
  secret: string;
}
