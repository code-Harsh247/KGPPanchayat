"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";

import { Button } from "@/Components/ui/btn";
import { Input } from "@/Components/ui/inputBox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define form schema
const formSchema = z.object({
  PhoneNumber: z.string().min(10, {
    message: "Enter a valid phone number.",
  }),
  Password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

const Login = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { PhoneNumber: "", Password: "" },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="w-screen h-auto flex flex-col items-center justify-center p-6 font-Crimson">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md flex flex-col items-center justify-center"
      >
        {/* Image Section */}
        <div className="w-40 sm:w-80 mb-6">
          <img src="./Images/Welcome-login.svg" alt="Welcome" className="w-full object-contain" />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-sm bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="PhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="Password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>

          {/* Sign Up Link */}
          <p className="text-center text-sm mt-4">
            Don't have an account yet?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </a>
          </p>
        </div>

      </motion.div >
      {/* Bottom Image */}
      <div className="absolute hidden lg:block z-10 left-0 bottom-0 w-1/4 xl:w-1/4">
        <img src='./Images/LoginAuntie.svg' className="w-full object-contain" />
      </div>
    </div>



  );
};

export default Login;
