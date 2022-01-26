import { Bill } from './bill';
import { IdDocument } from './id-document';
import { PersonalDetails } from './personal-details';
import { ResidentialAddress } from './residential-address';

export interface RequestedFields {
  personal_details?: {
    data: PersonalDetails;
  };

  passport?: Exclude<IdDocument, 'reverse_side'>;

  internal_passport?: IdDocument;

  driver_license?: IdDocument;

  identity_card?: IdDocument;

  address?: {
    data: ResidentialAddress;
  };

  utility_bill?: Bill;

  bank_statement?: Bill;

  rental_agreement?: Bill;

  passport_registration?: Bill;

  temporary_registration?: Bill;

  phone_number?: string;

  email?: string;
}
