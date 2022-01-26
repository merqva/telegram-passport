/**
 * Contains the fields to be decoded from Base64
 * @type Base64EncodedFields
 */
export type Base64EncodedFields = {
  /**
   * Base64-encoded string
   */
  data: string;

  /**
   * Base64-encoded string
   */
  hash: string;

  /**
   * Base64-encoded string
   */
  secret: string;
};

/**
 * Contains the Base64-decoded fields
 * @type Base64DecodedFields
 */
export type Base64DecodedFields = {
  /* Take all the properties from Base64EncodedFields and map them as Buffer */
  [Property in keyof Base64EncodedFields as Property]: Buffer;
};
