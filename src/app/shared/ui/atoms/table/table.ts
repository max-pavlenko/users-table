export type Column<T extends Record<string, any>> = { key: keyof T; label: string; }
export type CellContext<T extends Record<string, unknown>> = { column: Column<T>, $implicit: T };
