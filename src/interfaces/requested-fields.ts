import {
  BillLike,
  Credentials,
  Data,
  IdDocument,
  PersonalDetails,
  ResidentialAddress,
} from '.';

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
