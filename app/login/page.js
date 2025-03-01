"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/Components/ui/btn";
import { Input } from "@/Components/ui/inputBox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import useAuthStore from "@/States/auth";

// Define form schema
const formSchema = z.object({
  phone_number: z.string().min(10, {
    message: "Enter a valid phone number.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

const Login = () => {
  const router = useRouter();
  const { login, loading: authLoading, error: authError } = useAuthStore();
  const [loading, setLoading] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { phone_number: "", password: "" },
  });

  async function onSubmit(values) {
    setLoading(true);

    try {
      // Use the login function from the auth store
      const result = await login(values);
      
      if (result.success) {
        toast.success("Login successful!");
        router.push("/"); 
      } else {
        toast.error(result.error || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-Crimson relative">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl flex flex-col items-center justify-center"
      >
        {/* Image Section with enhanced animation */}
        <motion.div 
          className="w-40 sm:w-80 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img src="./Images/Welcome-login.svg" alt="Welcome" className="w-full object-contain" />
        </motion.div>

        {/* Form Section with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-sm bg-white shadow-xl p-6 rounded-xl overflow-hidden"
        >
          <div className="border rounded-t-xl py-4 px-6 -mx-6 -mt-6 mb-6">
            <h2 className="text-2xl text-black text-center">Login</h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        type="text" 
                        placeholder="Enter your phone number" 
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary_orange focus:ring focus:ring-primary_orange focus:ring-opacity-50" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your password" 
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary_orange focus:ring focus:ring-primary_orange focus:ring-opacity-50" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full px-6 py-2 bg-primary_orange hover:bg-secondary_orange text-white rounded-md transition-colors" 
                disabled={loading || authLoading}
              >
                {(loading || authLoading) ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : "Login"}
              </Button>
            </form>
          </Form>

          {/* Sign Up Link with animation */}
          <motion.p 
            className="text-center text-sm mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Don't have an account yet?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </a>
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Bottom Image with enhanced animation */}
      <motion.div 
        className="absolute hidden lg:block z-10 left-0 bottom-0 w-1/4 xl:w-1/4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <img src='./Images/LoginAuntie.svg' className="w-full object-contain" />
      </motion.div>
    </div>
  );
};

export default Login;