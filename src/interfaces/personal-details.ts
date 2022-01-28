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
