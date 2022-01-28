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
