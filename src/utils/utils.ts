export const sumOfTargetInStr = (str: string, target: string): number => {
  return str.split(target).length - 1;
};
