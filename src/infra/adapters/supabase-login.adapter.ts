import { IAuthContract } from "@/domain/auth";
import { createClient } from "../gateway/supabase";

export function supabaseLoginAdapter(): IAuthContract {
  const supabase = createClient();
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  const loginWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };
  return { loginWithGoogle, loginWithGithub };
}
