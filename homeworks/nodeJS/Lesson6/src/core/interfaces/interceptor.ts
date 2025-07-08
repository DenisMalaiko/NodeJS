export interface InterceptorContext {
  method: Function;
  args: any[];
  context: any;
}

export interface Interceptor {
  intercept(ctx: InterceptorContext, next: () => Promise<any>): Promise<any>;
}