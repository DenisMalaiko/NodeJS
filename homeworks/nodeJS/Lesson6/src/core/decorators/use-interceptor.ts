import { container } from '../container';

const INTERCEPTOR_KEY = 'mini:interceptors';

export interface InterceptorContext {
  method: (...args: any[]) => any;
  args: any[];
  context: any;
}

export interface Interceptor {
  intercept(ctx: InterceptorContext, next: () => Promise<any>): Promise<any>;
}

export function UseInterceptor(interceptorClass: new () => Interceptor): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const interceptors =
      Reflect.getMetadata(INTERCEPTOR_KEY, target, propertyKey) || [];

    interceptors.push(interceptorClass);

    Reflect.defineMetadata(INTERCEPTOR_KEY, interceptors, target, propertyKey);

    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let idx = 0;

      const next = async (): Promise<any> => {
        if (idx >= interceptors.length) {
          return originalMethod.apply(this, args);
        }

        const InterceptorClass = interceptors[idx++];
        const interceptorInstance = container.resolve(InterceptorClass) as Interceptor;

        if (!interceptorInstance || typeof interceptorInstance.intercept !== 'function') {
          throw new Error(`Interceptor ${InterceptorClass.name} must implement "intercept" method`);
        }

        return interceptorInstance.intercept(
          { method: originalMethod, args, context: this },
          next
        );
      };

      return next();
    };

    return descriptor;
  };
}