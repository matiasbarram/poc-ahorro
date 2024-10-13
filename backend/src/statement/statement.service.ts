import { Injectable } from '@nestjs/common';
import { CreateStatementDto } from './dto/create-statement.dto';
import { UpdateStatementDto } from './dto/update-statement.dto';
import { FileUploadDto } from './dto/file-upload.dto';
import { extractBancoEstadoTransactions } from './readFile/bancoEstado';

@Injectable()
export class StatementService {

  processFile(file: Express.Multer.File, fileUploadDto: FileUploadDto) {
    let transactions;

    switch (fileUploadDto.bank) {
      case "bancoEstado":
        transactions = extractBancoEstadoTransactions(file);
        break;
      default:
        throw new Error(`Unsupported bank: ${fileUploadDto.bank}`);
    }

    return {
      filename: file.originalname,
      size: file.size,
      transactions
    };
  }

  create(createStatementDto: CreateStatementDto) {
    return 'This action adds a new statement';
  }

  findOne(id: number) {
    return `This action returns a #${id} statement`;
  }

  update(id: number, updateStatementDto: UpdateStatementDto) {
    return `This action updates a #${id} statement`;
  }

  remove(id: number) {
    return `This action removes a #${id} statement`;
  }
}
