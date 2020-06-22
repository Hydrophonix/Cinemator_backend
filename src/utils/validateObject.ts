export type Result<T> =
    | { ok: true, value: T }
    | { ok: false, message: string }

export interface IValidator<T> {
    go(value: unknown): Result<T>;
}
