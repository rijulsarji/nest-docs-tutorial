import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cats.interface';
import { ValidationPipe } from 'src/utils/validation.pipe';
import { RolesGuard } from 'src/utils/roles.guard';
import { Roles } from 'src/utils/roles.decorator';
import { LoggerInterceptor } from 'src/utils/logger.interceptor';
import { TransformInterceptor } from 'src/utils/transform.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
// @UseInterceptors(LoggerInterceptor)
@UseInterceptors(TransformInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  // @UsePipes(new ZodValidationPipe(createCatSchema)) ------- for zod validation
  @Roles(['admin'])
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  // @Redirect('https:/rijulsarji.netlify.app', 301)
  // @HttpCode(202)
  // @UseFilters(new HttpExceptionFilter()) added in global filters
  async findAll(): Promise<Cat[]> {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.catsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param() params: any): string {
  //   return `this action requires ${params.id}`;
  // }

  // OR

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): string {
    return `this action requires ${id}`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update: CreateCatDto) {
    return `this is updated: id: ${id}, name ${update.name}, age: ${update.age}, breed: ${update.breed}`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `this will delete ${id}`;
  }
}
