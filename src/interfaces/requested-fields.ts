import {
  BillLike,
  Data,
  IdDocument,
  PersonalDetails,
  ResidentialAddress,
} from '.';

/**
 * Represents the list of data types that can be requested, and the encrypted objects
 * that will contain such data. All the fields are optional
 * @see [Fields](https://core.telegram.org/passport#fields)
 * @interface RequestedFields
 */
export interface RequestedFields {
  /**
   * Personal Details
   */
  personal_details?: Data<PersonalDetails>;

  /**
   * Passport
   */
  passport?: Exclude<IdDocument, 'reverse_side'>;

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
