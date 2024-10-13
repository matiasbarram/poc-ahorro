import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { UsersModule } from './users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatementModule } from 'src/statement/statement.module';
import { StatementController } from 'src/statement/statement.controller';
import { StatementService } from 'src/statement/statement.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './app.sqlite3',
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true, // only for dev
    }),
    UsersModule,
    StatementModule
  ],
  controllers: [AppController, StatementController],
  providers: [AppService, StatementService],
})
export class AppModule { }
