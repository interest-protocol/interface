import { always, tryCatch } from 'ramda';

export const safeStringify = tryCatch(JSON.stringify, always(''));
