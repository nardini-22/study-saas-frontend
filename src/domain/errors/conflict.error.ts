interface ConflictErrorProps {
  code: string;
  message?: string;
}

class ConflictError extends Error {
  constructor({ code, message }: ConflictErrorProps) {
    super(code);
    this.message = message || code;
    this.name = "ConflictError";
  }
}

export { ConflictError };
export type { ConflictErrorProps };
