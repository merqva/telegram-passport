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
