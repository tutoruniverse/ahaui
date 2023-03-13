class PluginArray<T extends Record<string, any>> extends Array<T> {
  constructor(...items: T[]) {
    super(...items);
    Object.setPrototypeOf(this, Object.create(PluginArray.prototype));
  }

  traverseCall(methodName: string, ...param: unknown[]): unknown[] {
    const results: unknown[] = [];

    this.forEach((plugin) => {
      if (typeof plugin[methodName] !== 'function') {
        throw new Error(
          `Invalid plugin: One plugin does not have method with name "${methodName}".`,
        );
      }
      const result = plugin[methodName](...param);
      results.push(result);
    });

    return results;
  }
}

export default PluginArray;
