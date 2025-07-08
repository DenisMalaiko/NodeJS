const TOKEN_KEY = 'mini:inject_token';

export function Inject(token: any): ParameterDecorator {

  return (target, propertyKey, parameterIndex) => {

    const existingInjectToken = Reflect.getMetadata(TOKEN_KEY, target) || [];

    existingInjectToken.push({ index: parameterIndex, token });

    Reflect.defineMetadata(TOKEN_KEY, existingInjectToken, target);
  };
}