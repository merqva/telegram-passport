import {
  constants,
  createDecipheriv,
  createHash,
  privateDecrypt,
} from 'crypto';
import { ErrorMessages } from './constants';
import { Credentials } from './interfaces/credentials';
import { EncryptedCredentials } from './interfaces/encrypted-credentials';

export class TelegramPassport {
  private readonly privateKey: Buffer;

  constructor(privateKey: string | Buffer) {
    this.privateKey = Buffer.from(privateKey);
  }

  private decryptData(data: Buffer, secret: Buffer, hash: Buffer) {
    /* Use the secret and the hash to calculate key and iv */
    const hasher = createHash('sha512');

    /* Feed the hasher */
    hasher.update(Buffer.concat([secret, hash]));

    /* Get the digest */
    const digest = hasher.digest();

    /* Obtain key and iv */
    const key = digest.slice(0, 32);
    const iv = digest.slice(32, 48);

    /* Decrypt the data by AES256-CBC using these key and iv */
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    decipher.setAutoPadding(false);

    const dataPadded = Buffer.concat([decipher.update(data), decipher.final()]);

    /* Assert the data's integrity */
    const integrityHasher = createHash('sha256');

    /* Feed the hasher */
    integrityHasher.update(dataPadded);

    /* Get the digest */
    const dataHash = integrityHasher.digest();

    if (!hash.equals(dataHash)) {
      throw new Error(ErrorMessages.ERR_DATA_INTEGRITY_CHECK_FAILED);
    }

    /**
     * Data is padded with 32 to 255 random padding bytes to make its length divisible by 16 bytes.
     * The first byte contains the length of this padding (including this byte).
     * Remove the padding to get the data.
     */
    return dataPadded.slice(dataPadded[0], dataPadded.byteLength);
  }

  decryptPassportCredentials(
    encryptedCredentials: EncryptedCredentials,
  ): Credentials {
    /* Note that all Base64-encoded fields should be decoded before use */
    const data = Buffer.from(encryptedCredentials.data, 'base64');
    const secret = Buffer.from(encryptedCredentials.secret, 'base64');
    const hash = Buffer.from(encryptedCredentials.hash, 'base64');

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
    const _data = this.decryptData(data, decryptedSecret, hash);

    return JSON.parse(_data.toString());
  }
}
