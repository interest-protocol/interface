import { always, tryCatch } from 'ramda';

export const safeParse = tryCatch(JSON.parse, always({}));

export const safeStringify = tryCatch(JSON.stringify, always(''));
