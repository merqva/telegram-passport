import { EncryptedPassportElementType } from './types';

/**
 * Object signature for the requested "utility_bill".
 * @see [Fields](https://core.telegram.org/passport#fields)
 *
 * It is used to define "bank_statement", "rental_agreement", "passport_registration"
 * and "temporary_registration" too, since they share the same signature.
 *
 * @interface BillLike
 */
export interface BillLike {
  /**
   * Array of documents with credentials merged into it
   */
  files: Array<PassportFile & FileCredentials>;

  /**
   * Optional. Array of certified english translations of the documents, with credentials merged into it
   */
  translation?: Array<PassportFile & FileCredentials>;
}

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

/**
 * These credentials can be used to decrypt encrypted data from the data field in EncryptedPassportElement
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

/**
 * Represents the data key on those fields that contain a data key
 * like "personal_details", "passport", "internal_passport", "driver_license",
 * "identity_card" and "address"
 * @see [Fields](https://core.telegram.org/passport#fields)
 * @interface Data
 */
export interface Data<
  T extends IdDocumentData | PersonalDetails | ResidentialAddress,
> {
  /**
   * data key, can only be of type IdDocumentData, PersonalDetails or ResidentialAddress
   */
  data: T;
}

/**
 * Contains data required for decrypting and authenticating EncryptedPassportElement
 * @see [EncryptedCredentials](https://core.telegram.org/bots/api#encryptedcredentials)
 * @interface EncryptedCredentials
 */
export interface EncryptedCredentials {
  /**
   * Base64-encoded encrypted JSON-serialized data with unique user's payload, data
   * hashes and secrets required for `EncryptedPassportElement` decryption and authentication
   */
  data: string;

  /**
   * Base64-encoded data hash for data authentication
   */
  hash: string;

  /**
   * Base64-encoded secret, encrypted with the bot's public RSA key, required for data decryption
   */
  secret: string;
}

/**
 * Contains information about documents or other Telegram Passport elements shared with the bot by the user
 * @see [EncryptedPassportElement](https://core.telegram.org/bots/api#encryptedpassportelement)
 * @interface EncryptedPassportElement
 */
export interface EncryptedPassportElement {
  /**
   * Element type. One of "personal_details", "passport", "driver_license", "identity_card", "internal_passport",
   * "address", "utility_bill", "bank_statement", "rental_agreement", "passport_registration",
   * "temporary_registration", "phone_number", "email"
   */
  type: EncryptedPassportElementType;

  /**
   * Optional. Base64-encoded encrypted Telegram Passport element data provided by the user.
   * Available for "personal_details”, "passport", "driver_license", "identity_card", "internal_passport"
   * and "address" types. Can be decrypted and verified using the accompanying `EncryptedCredentials`
   */
  data?: string;

  /**
   * Optional. User's verified phone number, available only for "phone_number" type
   */
  phone_number?: string;

  /**
   * Optional. User's verified email address, available only for "email" type
   */
  email?: string;

  /**
   * Optional. Array of encrypted files with documents provided by the user.
   * Available for "utility_bill", "bank_statement", "rental_agreement", "passport_registration"
   * and "temporary_registration" types.
   * Files can be decrypted and verified using the accompanying `EncryptedCredentials`
   */
  files?: Array<PassportFile>;

  /**
   * Optional. Encrypted file with the front side of the document, provided by the user.
   * Available for "passport", "driver_license", "identity_card" and "internal_passport".
   * The file can be decrypted and verified using the accompanying `EncryptedCredentials`
   */
  front_side?: PassportFile;

  /**
   * Optional. Encrypted file with the reverse side of the document, provided by the user.
   * Available for "driver_license" and "identity_card".
   * The file can be decrypted and verified using the accompanying `EncryptedCredentials`
   */
  reverse_side?: PassportFile;

  /**
   * Optional. Encrypted file with the selfie of the user holding a document, provided by the user.
   * Available for "passport", "driver_license", "identity_card" and "internal_passport".
   * The file can be decrypted and verified using the accompanying `EncryptedCredentials`
   */
  selfie?: PassportFile;

  /**
   * Optional. Array of encrypted files with translated versions of documents provided by the user.
   * Available if requested for "passport", "driver_license", "identity_card", "internal_passport",
   * "utility_bill", "bank_statement", "rental_agreement", "passport_registration"
   * and "temporary_registration" types.
   * Files can be decrypted and verified using the accompanying `EncryptedCredentials`
   */
  translation?: Array<PassportFile>;

  /**
   * Base64-encoded element hash for using in `PassportElementErrorUnspecified`
   */
  hash: string;
}

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

/**
 * This object represents the data of an identity document
 * @see [IdDocumentData](https://core.telegram.org/passport#iddocumentdata)
 * @interface IdDocumentData
 */
export interface IdDocumentData {
  /**
   * Document number
   */
  document_no: string;

  /**
   * Optional. Date of expiry, in DD.MM.YYYY format
   */
  expiry_date?: string;
}

/**
 * Object signature for the requested "passport", "internal_passport", "driver_license"
 * and "identity_card"
 * @see [Fields](https://core.telegram.org/passport#fields)
 * @interface IdDocument
 */
export interface IdDocument extends Data<IdDocumentData> {
  /**
   * Front side of the document with credentials merged into it
   */
  front_side: PassportFile & FileCredentials;

  /**
   * Reverse side of the document with credentials merged into it
   */
  reverse_side: PassportFile & FileCredentials;

  /**
   * Selfie of the user holding the document, with credentials merged into it
   */
  selfie?: PassportFile & FileCredentials;

  /**
   * Optional. Array of certified english translations of the document, with credentials merged into it
   */
  translation?: Array<PassportFile & FileCredentials>;
}

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

/**
 * This object represents a file uploaded to Telegram Passport.
 * Currently all Telegram Passport files are in JPEG format when decrypted and don't exceed 10MB
 * @see [PassportFile](https://core.telegram.org/bots/api#passportfile)
 * @interface PassportFile
 */
export interface PassportFile {
  /**
   * Identifier for this file, which can be used to download or reuse the file
   */
  file_id: string;

  /**
   * Unique identifier for this file, which is supposed to be the same over time and for different bots.
   * Can't be used to download or reuse the file
   */
  file_unique_id: string;

  /**
   * File size in bytes
   */
  file_size: number;

  /**
   * Unix time when the file was uploaded
   */
  file_date: number;
}

/**
 * This object represents personal details
 * @see [PersonalDetails](https://core.telegram.org/passport#personaldetails)
 * @interface PersonalDetails
 */
export interface PersonalDetails {
  /**
   * First Name
   */
  first_name: string;

  /**
   * Last Name
   */
  last_name: string;

  /**
   * Optional. Middle Name
   */
  middle_name?: string;

  /**
   * Date of birth in DD.MM.YYYY format
   */
  birth_date: string;

  /**
   * Gender, male or female
   */
  gender: 'male' | 'female';

  /**
   * Citizenship (ISO 3166-1 alpha-2 country code)
   */
  country_code: string;

  /**
   * Country of residence (ISO 3166-1 alpha-2 country code)
   */
  residence_country_code: string;

  /**
   * Optional. First Name in the language of the user's country of residence
   */
  first_name_native?: string;

  /**
   * Optional. Last Name in the language of the user's country of residence
   */
  last_name_native?: string;

  /**
   * Optional. Middle Name in the language of the user's country of residence
   */
  middle_name_native?: string;
}

/**
 * Represents the list of data types that can be requested, and the encrypted objects
 * that will contain such data. All these fields are optional. It also contains the
 * Bot-specified nonce (always present)
 * @see [Fields](https://core.telegram.org/passport#fields)
 * @interface RequestedFields
 */
export interface RequestedFields extends Omit<Credentials, 'secure_data'> {
  /**
   * Personal Details
   */
  personal_details?: Data<PersonalDetails>;

  /**
   * Passport
   */
  passport?: Omit<IdDocument, 'reverse_side'>;

  /**
   * Internal Passport
   */
  internal_passport?: IdDocument;

  /**
   * Driver License
   */
  driver_license?: IdDocument;

  /**
   * Identity Card
   */
  identity_card?: IdDocument;

  /**
   * Address
   */
  address?: Data<ResidentialAddress>;

  /**
   * Utility Bill
   */
  utility_bill?: BillLike;

  /**
   * Bank Statement
   */
  bank_statement?: BillLike;

  /**
   * Rental Agreement
   */
  rental_agreement?: BillLike;

  /**
   * Registration Page in the Internal Passport
   */
  passport_registration?: BillLike;

  /**
   * Temporary Registration
   */
  temporary_registration?: BillLike;

  /**
   * Phone number
   */
  phone_number?: string;

  /**
   * Email
   */
  email?: string;
}

/**
 * This object represents a residential address
 * @see [ResidentialAddress]
 * @interface ResidentialAddress
 */
export interface ResidentialAddress {
  /**
   * First line for the address
   */
  street_line1: string;

  /**
   * Optional. Second line for the address
   */
  street_line2?: string;

  /**
   * City
   */
  city: string;

  /**
   * Optional. State
   */
  state?: string;

  /**
   * ISO 3166-1 alpha-2 country code
   */
  country_code: string;

  /**
   * Address post code
   */
  post_code: string;
}

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
