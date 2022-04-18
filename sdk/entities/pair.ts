export class Pair<T = unknown, K = unknown> {
  public readonly first;
  public readonly second;

  protected constructor(first: T, second: K) {
    this.first = first;
    this.second = second;
  }

  public static from<T = unknown, K = unknown>(x: T, y: K): Pair {
    return new Pair(x, y);
  }
}
