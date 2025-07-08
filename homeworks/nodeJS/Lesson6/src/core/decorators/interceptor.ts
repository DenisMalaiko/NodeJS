import {container} from "../container";

export function Interceptor() {
  return function (target: any) {
    container.register(target, target);
    Reflect.defineMetadata('mini:isInterceptor', true, target);
  };
}