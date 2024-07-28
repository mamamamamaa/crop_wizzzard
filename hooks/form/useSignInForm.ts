import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

const schema = z.object({
  emailOrUsername: z.string().min(1, "Email or Username is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

type FormType = z.infer<typeof schema>;

export const useSignInForm = () => {
  const router = useRouter();
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormType) => {
    try {
      await signIn("credentials", {
        emailOrUsername: values.emailOrUsername,
        password: values.password,
        redirect: false,
      });

      router.replace("/?profile=true");
    } catch (error) {
      if (error instanceof Error) {
        form.setError("emailOrUsername", { message: error.message });
      }
    }
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  return {
    form,
    handleSubmit,
  };
};
