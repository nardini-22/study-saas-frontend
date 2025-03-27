interface ForbiddenErrorProps {
  code: string;
  message?: string;
}

class ForbiddenError extends Error {
  constructor({ code, message }: ForbiddenErrorProps) {
    super(code || message);
    this.name = "ForbiddenError";
  }
}

export { ForbiddenError };
export type { ForbiddenErrorProps };
