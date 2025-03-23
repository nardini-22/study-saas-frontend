import { IAuthContract } from "@/domain/auth";
import { createClient } from "../gateway/supabase";

export function supabaseLoginAdapter(): IAuthContract {
  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ??
      process?.env?.NEXT_PUBLIC_VERCEL_URL ??
      "http://localhost:3000/";
    url = url.startsWith("http") ? url : `https://${url}`;
    url = url.endsWith("/") ? url : `${url}/`;
    return url;
  };

  const supabase = createClient();
  const loginWithGoogle = async ({
    redirectTo,
  }: IAuthContract.loginWithGoogle) => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getURL()}/${redirectTo}`,
      },
    });
  };
  const loginWithGithub = async ({
    redirectTo,
  }: IAuthContract.loginWithGithub) => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${getURL()}/${redirectTo}`,
      },
    });
  };
  return { loginWithGoogle, loginWithGithub };
}
