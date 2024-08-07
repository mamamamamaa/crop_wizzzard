"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FormProvider } from "react-hook-form";
import { Divider } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import logo from "@/public/logo.jpg";
import { TextField } from "@/components";
import { useSignInForm, useOAuthForms } from "@/hooks";

export default function Page() {
  const router = useRouter();
  const { data } = useSession();
  const { form, handleSubmit } = useSignInForm();
  const { handleGitHubAuth, handleGoogleAuth } = useOAuthForms();

  useEffect(() => {
    if (data?.user) {
      router.replace("/?profile=true");
    }
  }, [data]);

  return (
    <FormProvider {...form}>
      <main className="flex min-h-screen flex-row w-full">
        <div className="relative flex w-[50vw] items-center justify-center shadow-lg">
          <h1
            className="absolute top-10 text-5xl text-center font-bold"
            style={{
              fontFamily: "Poppins, sans-serif",
              textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
              color: "#ffffff",
            }}
          >
            CropWizard
          </h1>
          <img
            src={logo.src}
            alt="logo"
            className="h-[100vh] w-[50vw] object-cover"
          />
        </div>
        <div className="flex w-[50vw] items-center justify-center p-10 shadow-lg">
          <div className="min-w-[400px] flex flex-col gap-6">
            <h1 className="text-5xl font-bold text-center mb-8">Sign In</h1>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <TextField
                name="emailOrUsername"
                label="Email or Username"
                isRequired
              />
              <TextField
                name="password"
                label="Password"
                variant="bordered"
                isRequired
                type="password"
              />
              <Button className="mt-4" type="submit">
                Submit
              </Button>

              <Divider className="bg-white" content="Or" />

              <Button type="button" onClick={handleGitHubAuth}>
                <FontAwesomeIcon icon={faGithub} size="lg" />
                Sign In with GitHub
              </Button>
              <Button type="button" onClick={handleGoogleAuth}>
                <FontAwesomeIcon icon={faGoogle} size="lg" />
                Sign In with Google
              </Button>
            </form>
            <p className="text-center text-sm mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/auth/sign-up" className="text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </main>
    </FormProvider>
  );
}
