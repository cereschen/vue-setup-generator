export function useGenerator<T>(gen: () => Generator<T>) {
  if (Object.prototype.toString.call(gen) !== "[object GeneratorFunction]") {
    throw new Error('[vue-setup-generator]: please privide a GeneratorFunction')
  }
  const obj: Record<any, any> = {}
  const iterator = gen()
  const propSet = new Set<string>()
  for (const item of iterator) {
    if (item instanceof Object) {
      for (let prop in item) {
        if (!propSet.has(prop)) {
          propSet.add(prop)
          obj[prop] = item[prop]
        } else {
          throw new Error(`[vue-setup-generator]: Duplicate key: ["${prop}"]`)
        }
      }
    }
  }
  return obj as T
}

