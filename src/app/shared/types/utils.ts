export type ValueOf<T extends Record<PropertyKey, any>> = T[keyof T];
export type Unique<T = string> = { id: T }
