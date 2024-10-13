import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    getUsers(): Promise<User[]> {
        return this.userRepository.find()
    }

    async getUser(id: number): Promise<User> {

        const user = await this.userRepository.findOne({
            where: {
                id
            }
        })
        if ( !user ) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        return user

    }

    async creteUser(user: CreateUserDto): Promise<User> {
        const userExists = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        })
        if ( userExists ) {
            throw new HttpException('user already exists', HttpStatus.CONFLICT)
        }
        const newUser = this.userRepository.create(user)
        return this.userRepository.save(newUser)
    }
}
