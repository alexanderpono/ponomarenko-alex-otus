export type ErrorFields<T> = {
    [K in keyof T]: string;
};
