interface UnauthorizedErrorProps {
  code: string;
  message?: string;
}

class UnauthorizedError extends Error {
  constructor({ code, message }: UnauthorizedErrorProps) {
    super(code || message);
    this.name = "UnauthorizedError";
  }
}

export { UnauthorizedError };
export type { UnauthorizedErrorProps };
