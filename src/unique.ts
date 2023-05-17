export function unique<T>(predicate: (el: T, it: T) => boolean): (element: T, index: number, arr: T[]) => boolean {
  return (element: T, index: number, arr: T[]) => arr.findIndex((a) => predicate(element, a)) === index
}
