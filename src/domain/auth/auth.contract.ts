export interface IAuthContract {
  loginWithGoogle(): Promise<void>;
  loginWithGithub(): Promise<void>;
}
