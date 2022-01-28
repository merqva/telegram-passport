import { IdDocumentData, PersonalDetails, ResidentialAddress } from '.';

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
