import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './utils/cats.middleware';
import { RolesGuard } from './utils/roles.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './utils/logger.interceptor';

@Module({
  imports: [CatsModule],
  providers: [
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
