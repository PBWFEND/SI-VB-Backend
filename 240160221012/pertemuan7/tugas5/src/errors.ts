export class AppError extends Error {
  status: number;
  errors?: string[];

  constructor(message: string, status = 500, errors?: string[]) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.errors = errors;
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, errors?: string[]) {
    super(message, 400, errors);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}