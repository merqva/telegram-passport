/**
 * These credentials can be used to decrypt encrypted files from the front_side, reverse_side, selfie,
 * files and translation fields in EncryptedPassportElement
 * @see [FileCredentials](https://core.telegram.org/passport#filecredentials)
 * @interface FileCredentials
 */
export interface FileCredentials {
  /**
   * Checksum of encrypted file
   */
  file_hash: string;

  /**
   * Secret of encrypted file
   */
  secret: string;
}
