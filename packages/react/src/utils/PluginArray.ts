class PluginArray extends Array {
  traverseCall(methodName: string, ...param: string[] | boolean[]): any {
    const results = [];
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
