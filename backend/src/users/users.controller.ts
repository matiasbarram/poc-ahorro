import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.getUsers()
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUser(id)
    }


    @Post()
    createUser(@Body() newUser: CreateUserDto) {
        return this.usersService.creteUser(newUser)
    }
}
