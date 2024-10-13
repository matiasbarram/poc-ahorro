import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { BANKS, BANK_FILE_TYPES, Banks } from 'src/constants/banks';
import {  FileUploadDto } from '../dto/file-upload.dto';


@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor() { }

  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!file) {
      throw new HttpException("File not found", HttpStatus.UNPROCESSABLE_ENTITY)
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('File size exceeds limit');
    }
    return file;
  }
}


export const validateBank = (file: Express.Multer.File, body: FileUploadDto) => {
  if (!body.bank) {
    throw new HttpException("No bank found", HttpStatus.UNPROCESSABLE_ENTITY)
  }

  if (!isValidFileType(file, body.bank)) {
    throw new BadRequestException('Invalid file type for the specified bank');
  }
}

const isValidFileType = (file: Express.Multer.File, bank: string) => {
  return BANK_FILE_TYPES[bank]?.fileTypes.some((type: string) => file.mimetype.includes(type));
}
