export interface LocaleContent {
  locale?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  tokenDescription?: string;
  inputPlaceholder?: string;
  safeData?: string;
  dex?: Dex;
  stablecoin?: Pair;
  volatile?: Pair;
  info?: ReadonlyArray<string>;
  button?: string;
}
interface Dex {
  title?: string;
  description?: string;
  button?: string;
}
interface Pair {
  title?: string;
  equation?: string;
  description?: string;
  percent?: string;
}
