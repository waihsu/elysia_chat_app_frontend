import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "./ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/auth";
import { useEffect } from "react";

const signInSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password is required 6 letter" }),
});

export function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(formData: z.infer<typeof signInSchema>) {
    const resp = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!resp.ok) {
      const { messg } = await resp.json();
      toast({ title: messg, variant: "destructive" });
    } else {
      const {
        user,
        token,
      }: {
        user: {
          id: string;
          email: string;
          name: string;
        };
        token: string;
      } = await resp.json();
      login(user, token);
      toast({ title: "Login successful" });
      navigate("/");
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      console.log("hello");
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className=" shadow-lg rounded-lg p-8 w-full max-w-md ">
        <div className="flex items-center justify-between mb-6">
          <p className="text-2xl font-bold">Login</p>
          <Link
            className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500 underline"
            to="/sign-up"
          >
            Sign Up
          </Link>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g "user@gmail.com"' {...field} />
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
                    <Input placeholder="Password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <p className=" text-right">
              {" "}
              <Link
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500 text-sm underline "
                to="#"
              >
                Forgot Password?
              </Link>
            </p>
            <Button className=" w-full" size={"sm"} type="submit">
              Submit
            </Button>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?
              <Link
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500 underline"
                to="/sign-up"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
