// Utility types comunes
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

// Para funciones que pueden fallar
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

// Para estados de carga
export type LoadingState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

// Para operaciones asíncronas
export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

// Para paginación
export type Page<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

// Para formularios con react-hook-form
export type FormErrors<T> = {
  [K in keyof T]?: string;
};

// Para eventos
export type ChangeEvent<T = HTMLInputElement> = React.ChangeEvent<T>;
export type FormEvent = React.FormEvent<HTMLFormElement>;
export type MouseEvent = React.MouseEvent<HTMLElement>;

// Para funciones de utilidad
export type Predicate<T> = (item: T) => boolean;
export type Comparator<T> = (a: T, b: T) => number;
export type Transformer<T, U> = (item: T) => U;
