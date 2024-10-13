import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UsePipes } from '@nestjs/common';
import { StatementService } from './statement.service';
import { CreateStatementDto } from './dto/create-statement.dto';
import { UpdateStatementDto } from './dto/update-statement.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe, validateBank } from './pipes/file-validation.pipe';
import { CombinedFileBodyDto, FileUploadDto } from './dto/file-upload.dto';

@Controller('statement')
export class StatementController {
  constructor(private readonly statementService: StatementService) { }


  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file'),
  )
  async uploadFile(
    @UploadedFile(
      new FileValidationPipe(),
    ) 
    file: Express.Multer.File,
    @Body() body: FileUploadDto,
  ) {
    try {
      validateBank(file, body)
      const result = this.statementService.processFile(file, body);
      return result;
    } catch (error) {
        throw error;
    }
  }

  @Post()
  create(@Body() createStatementDto: CreateStatementDto) {
    return this.statementService.create(createStatementDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatementDto: UpdateStatementDto) {
    return this.statementService.update(+id, updateStatementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statementService.remove(+id);
  }
}
