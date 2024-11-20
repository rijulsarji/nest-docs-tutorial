import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { ValidationPipe } from './utils/validation.pipe';
import { RolesGuard } from './utils/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RolesGuard()); use dependency injection for guards and generally all kinds of filters and pipes
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
