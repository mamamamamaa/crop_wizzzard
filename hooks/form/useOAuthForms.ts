import { signIn } from "next-auth/react";

export const useOAuthForms = () => {
  const handleGitHubAuth = async () => await signIn("github");

  const handleGoogleAuth = async () => await signIn("google");

  return { handleGitHubAuth, handleGoogleAuth };
};
