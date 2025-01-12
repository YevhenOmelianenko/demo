import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundError } from './errors/user-not-found.error';
import { UserNotDeletedError } from './errors/user-not-deleted.error';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return user;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(+id);
      if (user === null) {
        throw new UserNotFoundError(+id);
      }
      return user;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(+id, updateUserDto);
      if (user === null) {
        throw new UserNotFoundError(+id);
      }
      return user;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.usersService.remove(+id);
      if (result.affected === 0) {
        throw new UserNotDeletedError();
      }
      return { status: 'ok' };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
