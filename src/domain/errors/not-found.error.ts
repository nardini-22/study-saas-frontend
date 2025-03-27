interface NotFoundErrorProps {
  code: string;
  message?: string;
}

class NotFoundError extends Error {
  constructor({ code, message }: NotFoundErrorProps) {
    super(code || message);
    this.name = "NotFoundError";
  }
}

export { NotFoundError };
export type { NotFoundErrorProps };
