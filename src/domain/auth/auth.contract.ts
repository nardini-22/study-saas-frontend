export interface IAuthContract {
  loginWithGoogle(props: IAuthContract.loginWithGoogle): Promise<void>;
  loginWithGithub(props: IAuthContract.loginWithGoogle): Promise<void>;
}

export namespace IAuthContract {
  export type loginWithGoogle = { redirectTo: string };
  export type loginWithGithub = { redirectTo: string };
}
