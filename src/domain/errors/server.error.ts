interface ServerErrorProps {
  code: string;
  message?: string;
}

class ServerError extends Error {
  constructor({ code, message }: ServerErrorProps) {
    super(code || message);
    this.name = "ServerError";
  }
}

export { ServerError };
export type { ServerErrorProps };
