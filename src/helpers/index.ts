/**
 * Simple Helper function which flattens a nested object.
 * @param obj
 * @returns the flattend object
 */
export const flatten = (obj: Record<string, any>) => {
  let flattendObj: Record<string, any> = {};
  // console.log(obj);
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(flattendObj, flatten(obj[key]));
    } else {
      flattendObj[key] = obj[key];
    }
  });
  return flattendObj;
};
