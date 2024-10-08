declare module 'short-unique-id' {
    export default class ShortUniqueId {
      constructor(options?: { length?: number });
      generate(): string;
    }
}