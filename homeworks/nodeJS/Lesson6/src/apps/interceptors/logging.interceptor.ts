import { Interceptor } from '../../core/decorators/interceptor';
import type { InterceptorContext } from '../../core/interfaces/interceptor';

@Interceptor()
export class LoggingInterceptor {
  async intercept(ctx: InterceptorContext, next: () => Promise<any>): Promise<any> {
    console.log("[ INTERCEPTOR START ] ");

    const result = await next();
    result.isCheckedByInterceptor = true;

    console.log("[ INTERCEPTOR END ] ", result);
    return result;
  }
}