import { FileCredentials } from './file-credentials';
import { PassportFile } from './passport-file';

export interface PassportFileAndCredentials extends PassportFile {
  credentials: FileCredentials;
}
