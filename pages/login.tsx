import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import Error from "@/components/Error";

import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/authContext";

const formSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }).min(2).max(50),
  password: z.string().min(4).max(50),
});

export const Login: NextPage = () => {
  const { error, login } = useAuth() as {
    error: any;
    login: (email: string, password: string) => Promise<boolean>;
  };
  const methods = useForm();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;

    const handleSubmit = async () => {
      const loggedIn = await login(email, password);

      const { redirect } = router.query;

      if (loggedIn) {
        router.push(`${redirect ? String(redirect) : "/"}`);
      }
    };

    handleSubmit();
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
            <Error error={error} />
          </div>
          <Form {...form}>
            <form
              className="flex flex-col"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="mail@example.com" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="mailto:support@delawareb2b.com"
                  className="underline"
                >
                  Contact us
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/stock.webp"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Login;
