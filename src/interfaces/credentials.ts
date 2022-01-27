import { SecureData } from '.';

/**
 * Credentials is a JSON-serialized object
 * @see [Credentials](https://core.telegram.org/passport#credentials)
 * @interface Credentials
 */
export interface Credentials {
  /**
   * Credentials for encrypted data
   */
  secure_data: SecureData;

  /**
   * Bot-specified nonce.
   * IMPORTANT: Make sure that the nonce is the same as was passed in the request
   */
  nonce: string;
}
