/**
 * Нужно превратить файл в ts и указать типы аргументов и типы возвращаемого значения
 * */
export const removePlus = (s: string): string => s.replace(/^\+/, '');

export const addPlus = (s: string): string => `+${s}`;

export const removeFirstZeros = (value: string): string => value.replace(/^(-)?[0]+(-?\d+.*)$/, '$1$2');

export const getBeautifulNumber = (value: number, separator = ' '): string =>
  value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

export const round = (value: number, accuracy = 2): number => {
  const d = 10 ** accuracy;
  return Math.round(value * d) / d;
};

const transformRegexp =
  /(matrix\(-?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, )(-?\d+(\.\d+)?), (-?\d+(\.\d+)?)\)/;

export type Point2D = {
  x: number;
  y: number;
};

export const getTransformFromCss = (transformCssString: string): Point2D => {
  const data = transformCssString.match(transformRegexp);
  if (!data) return { x: 0, y: 0 };
  return {
    x: parseInt(data[6], 10),
    y: parseInt(data[8], 10),
  };
};

export type RGB = [number, number, number];
export const getColorContrastValue = ([red, green, blue]: RGB) =>
  // http://www.w3.org/TR/AERT#color-contrast
  Math.round((red * 299 + green * 587 + blue * 114) / 1000);

export const getContrastType = (contrastValue: number): 'black' | 'white' => (contrastValue > 125 ? 'black' : 'white');

export const shortColorRegExp = /^#[0-9a-f]{3}$/i;
export const longColorRegExp = /^#[0-9a-f]{6}$/i;

export const checkColor = (color: string): void | never => {
  if (!longColorRegExp.test(color) && !shortColorRegExp.test(color)) throw new Error(`invalid hex color: ${color}`);
};

export const hex2rgb = (color: string): RGB => {
  checkColor(color);
  if (shortColorRegExp.test(color)) {
    const red = parseInt(color.substring(1, 2), 16);
    const green = parseInt(color.substring(2, 3), 16);
    const blue = parseInt(color.substring(3, 4), 16);
    return [red, green, blue];
  }
  const red = parseInt(color.substring(1, 3), 16);
  const green = parseInt(color.substring(3, 5), 16);
  const blue = parseInt(color.substring(5, 8), 16);
  return [red, green, blue];
};

export type NumberedArray<T> = { value: T; number: number }[];
export function getNumberedArray<T>(arr: T[]): NumberedArray<T> {
  return arr.map((value: T, number: number) => ({ value, number }));
}
export function toStringArray<T>(arr: NumberedArray<T>): string[] {
  return arr.map(({ value, number }) => `${value}_${number}`);
}

interface Customer {
  id: string;
  name: string;
  age: number;
  isSubscribed: boolean;
}
export type CustomerMap = Record<string, Partial<Customer>>;
export const transformCustomers = (customers: Customer[]): CustomerMap => {
  return customers.reduce((acc, customer) => {
    acc[customer.id] = { name: customer.name, age: customer.age, isSubscribed: customer.isSubscribed };
    return acc;
  }, {} as Record<string, Partial<Customer>>);
};
