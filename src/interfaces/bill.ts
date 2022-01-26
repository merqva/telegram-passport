import { PassportFileAndCredentials } from './passport-file-and-credentials';

export interface Bill {
  files: Array<PassportFileAndCredentials>;

  translation?: Array<PassportFileAndCredentials>;
}
