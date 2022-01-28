import {
  constants,
  createDecipheriv,
  createHash,
  privateDecrypt,
} from 'crypto';
import {
  Credentials,
  EncryptedCredentials,
  FileCredentials,
  PassportData,
  PassportFile,
  RequestedFields,
} from './interfaces';
import { ErrorMessages } from './constants';
import { Indexable, SecureDataKey, SecureValueKey, StrBuff } from './utils';

/**
 * This class implements Telegram Passport incoming data decrytion for EncryptedCredentials
 * and Files; and parsing/decryption of SecureData
 * @see [Telegram Passport](https://core.telegram.org/passport)
 */
export class TelegramPassport {
  /**
   * @member Buffer to store the private key data (in PEM format)
   */
  private readonly privateKey: Buffer;

  /**
   *
   * @param privateKey - string or Buffer containing the private key data
   */
  constructor(privateKey: StrBuff) {
    this.privateKey = Buffer.from(privateKey);
  }

  /**
   * @param data - string or Buffer containing the data to be decryted
   * @param secret - string or Buffer containing the secret necessary for data decrytion
   * @param hash - string or Buffer containing data hash, necessary for data integrity validation
   * and to calculate key and initialization vector, for data decrytion
   * @returns a Buffer containing the decrypted data
   */
  decryptData(data: StrBuff, secret: StrBuff, hash: StrBuff): Buffer {
    /* Note that all non-Buffer fields should be Base64-decoded before use */
    const _data = typeof data === 'string' ? Buffer.from(data, 'base64') : data;
    const _secret =
      typeof secret === 'string' ? Buffer.from(secret, 'base64') : secret;
    const _hash = typeof hash === 'string' ? Buffer.from(hash, 'base64') : hash;

    /* Use the secret and the hash to calculate key and iv */
    const hasher = createHash('sha512');

    /* Feed the hasher */
    hasher.update(Buffer.concat([_secret, _hash]));

    /* Get the digest */
    const digest = hasher.digest();

    /* Obtain key and iv */
    const key = digest.slice(0, 32);
    const iv = digest.slice(32, 48);

    /* Decrypt the data by AES256-CBC using these key and iv */
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    decipher.setAutoPadding(false);

    const dataPadded = Buffer.concat([
      decipher.update(_data),
      decipher.final(),
    ]);

    /* Assert the data's integrity */
    const integrityHasher = createHash('sha256');

    /* Feed the hasher */
    integrityHasher.update(dataPadded);

    /* Get the digest */
    const dataHash = integrityHasher.digest();

    if (!_hash.equals(dataHash)) {
      throw new Error(ErrorMessages.ERR_DATA_INTEGRITY_CHECK_FAILED);
    }

    /**
     * Data is padded with 32 to 255 random padding bytes to make its length divisible by 16 bytes.
     * The first byte contains the length of this padding (including this byte).
     * Remove the padding to get the data.
     */
    return dataPadded.slice(dataPadded[0], dataPadded.byteLength);
  }

  /**
   * @param encryptedCredentials - object containing the encryted credentials for data decryption
   * @returns and object containing the decrypted credentials
   */
  decryptPassportCredentials(
    encryptedCredentials: EncryptedCredentials,
  ): Credentials {
    /* Base64-decode the secret before use */
    const secret = Buffer.from(encryptedCredentials.secret, 'base64');
    /**
     * Decrypt the credentials secret (`secret` field in EncryptedCredentials)
     * using the private key (set OAEP padding option).
     */
    const decryptedSecret = privateDecrypt(
      {
        key: this.privateKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
      },
      secret,
    );

    /* Decrypt the data */
    const _data = this.decryptData(
      encryptedCredentials.data,
      decryptedSecret,
      encryptedCredentials.hash,
    );

    return JSON.parse(_data.toString());
  }

  /**
   * @param passportData - object containing the incoming passport data
   * @returns an object containig all the parsed fields
   */
  decryptPassportData(passportData: PassportData): RequestedFields {
    /* First, decrypt passport_data.credentials */
    const credentials = this.decryptPassportCredentials(
      passportData.credentials,
    );

    /* Init an empty fields object, so we can push data into it */
    // const fields: Record<string, unknown> = {};
    const fields: RequestedFields = {};

    /* Loop through each `EncryptedPassportElement` in passportData.data */
    for (const element of passportData.data) {
      /* phone_number and email are not encrypted, so just pass them along */
      if (element.type === 'phone_number' || element.type === 'email') {
        fields[element.type] = element[element.type];
      } else {
        /* The other fields are objects, let's init their keys so we can set sub-keys */
        (fields[element.type] as unknown as Indexable) = {};

        /**
         * Get the necessary credentials to decrypt the data.
         * For each entry of `EncryptedPassportElement` that is not "type", "phone_number",
         * "email" or "hash", there is a corresponding set of credentials in credentials.secure_data,
         * idenfied by the same name of the entry
         */
        const secureValue =
          credentials.secure_data[element.type as SecureDataKey];

        /* Loop through each of the remaining entries of the element */
        for (const [key, value] of Object.entries(element)) {
          /* Ignore "type" and "hash" */
          if (key !== 'type' && key !== 'hash') {
            /* "data" needs to be decrypted */
            if (key === 'data') {
              /* Decrypt "data" using the credentials form secure_data */
              const data = this.decryptData(
                element[key]!,
                secureValue![key]!.secret,
                secureValue![key]!.data_hash,
              );

              /* And copy it to its corresponding key on fields */
              (fields[element.type] as unknown as Indexable)[key] = JSON.parse(
                data.toString(),
              );
            } else {
              /**
               * Remaining fields of the element are either an Array of `PassportFile` for
               * "files" and "translation", or a single `PassportFile` for "front_side",
               * "reverse_side" and "selfie"
               */
              if (Array.isArray(value)) {
                /**
                 * In the case of an Array, map it to a new Array and merge the credentials
                 * into each one of the elements
                 */
                (fields[element.type] as unknown as Indexable)[key] = (
                  value as Array<PassportFile>
                ).map<PassportFile & FileCredentials>(
                  (passportFile, index) => ({
                    ...passportFile,
                    ...(
                      secureValue![
                        key as SecureValueKey
                      ] as Array<FileCredentials>
                    )[index],
                  }),
                );
              } else {
                (fields[element.type] as unknown as Indexable)[key] = {
                  ...value,
                  ...secureValue![key as SecureValueKey],
                };
              }
            }
          }
        }
      }
    }

    return fields;
  }
}
