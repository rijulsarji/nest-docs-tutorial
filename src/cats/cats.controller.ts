import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Redirect,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCat: CreateCatDto): string {
    return `this will create cat: name ${createCat.name}, age: ${createCat.age}, breed: ${createCat.breed}`;
  }

  @Get()
  // @Redirect('https:/rijulsarji.netlify.app', 301)
  // @HttpCode(202)
  findAll() {
    return 'this is all cats';
  }

  // @Get(':id')
  // findOne(@Param() params: any): string {
  //   return `this action requires ${params.id}`;
  // }

  // OR

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `this action requires ${id}`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update: CreateCatDto) {
    return `this is updated: id: ${id}, name ${update.name}, age: ${update.age}, breed: ${update.breed}`
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return(`this will delete ${id}`)
  }
}
