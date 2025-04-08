/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, originalUrl, ip, body } = req;
    const userAgent = req.get('user-agent') || '';
    const requestId = req.headers['x-request-id'] || `req-${Date.now()}`;

    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: (data) => {
          const responseTime = Date.now() - startTime;
          const statusCode = context.switchToHttp().getResponse().statusCode;

          let statusColor = '\x1b[36m';
          if (statusCode >= 400 && statusCode < 500) {
            statusColor = '\x1b[33m';
          } else if (statusCode >= 500) {
            statusColor = '\x1b[31m';
          }

          const responseColor = '\x1b[33m';

          let methodColor = '\x1b[36m';
          if (method === 'GET') methodColor = '\x1b[34m';
          if (method === 'POST') methodColor = '\x1b[36m';
          if (method === 'PUT' || method === 'PATCH') methodColor = '\x1b[33m';
          if (method === 'DELETE') methodColor = '\x1b[31m';

          this.logger.log(
            `${new Date().toISOString()} [${methodColor}${method}] ` +
              `${statusColor}${statusCode} ${originalUrl} ${responseColor}${responseTime}ms\n` +
              `User-Agent: ${userAgent}`,
          );

          // this.logger.log(
          //   new Date().toISOString() +
          //     ' [' +
          //     method +
          //     '] ' +
          //     statusCode +
          //     ' ' +
          //     originalUrl +
          //     ' ' +
          //     responseTime +
          //     'ms \n' +
          //     userAgent,
          // );
          // this.logger.log(
          //   JSON.stringify({
          //     timestamp: new Date().toISOString(),
          //     requestId,
          //     method,
          //     url: originalUrl,
          //     statusCode,
          //     responseTime: `${responseTime}ms`,
          //     ip,
          //     userAgent,
          //   }),
          // );
        },
        error: (error) => {
          const responseTime = Date.now() - startTime;
          const statusCode = error.status || 500;

          this.logger.error(
            JSON.stringify({
              timestamp: new Date().toISOString(),
              requestId,
              method,
              url: originalUrl,
              statusCode,
              responseTime: `${responseTime}ms`,
              ip,
              userAgent,
              errorMessage: error.message,
              stack:
                process.env.NODE_ENV === 'production' ? undefined : error.stack,
            }),
          );
        },
      }),
    );
  }
}
