import { Banks } from "src/constants/banks";

export class FileUploadDto {
  bank: Banks;
}

export class CombinedFileBodyDto {
  file: Express.Multer.File;
  body: FileUploadDto;
}
