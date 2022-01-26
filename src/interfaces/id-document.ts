import { IdDocumentData } from './id-document-data';
import { PassportFileAndCredentials } from './passport-file-and-credentials';

export interface IdDocument {
  data: IdDocumentData;

  front_side: PassportFileAndCredentials;

  reverse_side: PassportFileAndCredentials;

  selfie?: PassportFileAndCredentials;

  translation?: Array<PassportFileAndCredentials>;
}
