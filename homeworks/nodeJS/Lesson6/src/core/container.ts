import 'reflect-metadata';

export class Container {
  #registered = new Map();
  #singletons = new Map();

  resolve<T>(token: new (...args: any[]) => T): T {
    if (this.#singletons.has(token)) return this.#singletons.get(token);
    const cs = this.#registered.get(token);
    if(!cs) {
      throw new Error(`Token ${token.name} is not registered.`);
    }

    const paramTypes: any[] = Reflect.getMetadata("design:paramtypes", token) || [];
    const injectParams: { index: number; token: any }[] = Reflect.getMetadata("mini:inject_params", token) || [];

    const resolved = new cs(...paramTypes.map((type, index) => {
      const custom = injectParams.find(p => p.index === index);
      const depToken = custom?.token || type;

      if(depToken === token) {
        throw new Error(`Circular dependency detected for token ${token.name}.`);
      }

      return this.resolve(depToken);
    }));

    this.#singletons.set(token, resolved);
    return resolved;
  }

  register<T extends Function>(token: T, member: T): void {
    if (this.#registered.has(token)) {
      throw new Error(`Token ${token.name} is already registered.`);
    }

    this.#registered.set(token, member);
  }
}

export const container = new Container();
