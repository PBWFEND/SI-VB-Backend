export interface FieldError {
  field: string;
  message: string;
}

export default class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors?: FieldError[];

  constructor(statusCode: number, message: string, errors?: FieldError[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}