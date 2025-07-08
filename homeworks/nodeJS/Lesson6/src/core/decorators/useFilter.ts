import 'reflect-metadata';

const FILTER_METADATA_KEY = 'mini:filters';

export function UseFilter(filterClass: new () => any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(FILTER_METADATA_KEY, filterClass, descriptor.value);
  };
}

export function getFilter(target: any): any {
  return Reflect.getMetadata(FILTER_METADATA_KEY, target);
}