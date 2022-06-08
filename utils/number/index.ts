export const toFixedToPrecision = (
  x: string | number,
  fixedArg = 2,
  precisionArg = 2
) => (+(+x).toFixed(fixedArg)).toPrecision(precisionArg);
