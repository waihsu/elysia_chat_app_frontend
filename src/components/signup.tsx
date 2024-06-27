import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const signUpSchema = z.object({
  name: z.string().min(3, { message: "Name required 3 letters" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password is required 6 letters" }),
});

export function Signup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof signUpSchema>) {
    const resp = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const { messg } = await resp.json();
    if (!resp.ok) {
      toast({ title: messg, variant: "destructive" });
    } else {
      toast({ title: messg });
      navigate("/sign-in");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="  p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <Link
            className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500 underline"
            to="/sign-in"
          >
            Login
          </Link>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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

            <Button className=" w-full" size={"sm"} type="submit">
              Sign Up
            </Button>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?
              <Link
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500"
                to="/signin"
              >
                Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
