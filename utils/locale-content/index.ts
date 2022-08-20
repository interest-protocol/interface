import homeLang from '../../assets/home.json';
import { LocaleContent } from './locale-content';

export const getHomeLocaleContent = (
  section: 'hero' | 'earn' | 'borrow' | 'automate' | 'subscribe' | 'dex',
  locale = 'en-US'
): ReadonlyArray<LocaleContent> =>
  (homeLang[section] as ReadonlyArray<LocaleContent>).filter(
    (content: LocaleContent) => content.locale == locale
  );
