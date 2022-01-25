import { EncryptedCredentials } from './encrypted-credentials';
import { EncryptedPassportElement } from './encrypted-passport-element';

/**
 * Contains information about Telegram Passport data shared with the bot by the user
 * @see [PassportData](https://core.telegram.org/bots/api#passportdata)
 * @interface PassportData
 */
export interface PassportData {
  /**
   * Array with information about documents and other Telegram Passport elements that was shared with the bot
   */
  data: Array<EncryptedPassportElement>;

  /**
   * Encrypted credentials required to decrypt the data
   */
  credentials: EncryptedCredentials;
}
