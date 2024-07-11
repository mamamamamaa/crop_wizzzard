"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Link from "next/link";

import ray from "@/public/ray.jpg";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-row w-full">
      <img
        src={ray.src}
        alt="sharix"
        className="h-[100vh] w-[50vw] object-cover"
      />
      <div className="flex w-[50vw] items-center justify-center p-10 shadow-lg">
        <div className="min-w-[400px] flex flex-col gap-6">
          <h1 className="text-5xl font-bold text-center mb-8">Sign In</h1>
          <div className="flex flex-col gap-5">
            <Input
              type="email"
              label="Email"
              variant="bordered"
              isRequired
              fullWidth
              color="default"
            />
            <Input
              label="Password"
              variant="bordered"
              isRequired
              type="password"
              fullWidth
            />
            <Button className="mt-4">Submit</Button>
          </div>
          <p className="text-center text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
