export class Pair<T, K> {
  readonly _first: T;
  readonly _second: K;

  constructor(fst: T, snd: K) {
    this._first = fst;
    this._second = snd;
  }

  public first(): T {
    return this._first;
  }

  public second(): K {
    return this._second;
  }

  public toArray(): ReadonlyArray<K | T> {
    return [this._first, this._second];
  }
}
