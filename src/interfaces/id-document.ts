import { Data, FileCredentials, IdDocumentData, PassportFile } from '.';

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
