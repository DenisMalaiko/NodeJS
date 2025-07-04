export function Inject(token: any): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    const existingInjectedParams = Reflect.getMetadata('mini:inject_params', target) || [];

    existingInjectedParams.push({ index: parameterIndex, token });

    Reflect.defineMetadata('mini:inject_params', existingInjectedParams, target);
  };
}