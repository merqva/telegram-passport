import { FileCredentials, PassportFile } from '.';
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
