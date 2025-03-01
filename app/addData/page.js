"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { tableSchemas } from "@/lib/Schema";

const AddDataForm = () => {
  const searchParams = useSearchParams();
  const tableName = searchParams.get("name");
  const decodedTitle = searchParams.get("title");
 
  const schemaDefinition = tableSchemas[tableName] || [];
 
  const validationSchema = z.object(
    schemaDefinition.reduce((acc, field) => {
      acc[field.name] = field.required ? z.string().min(1, `${field.label} is required.`) : z.string().optional();
      return acc;
    }, {})
  );
  
  const form = useForm({
    resolver: (data) => {
      try {
        const parsed = validationSchema.parse(data);
        return { values: parsed, errors: {} };
      } catch (error) {
        return { 
          values: {}, 
          errors: error.errors.reduce((acc, curr) => {
            const path = curr.path[0];
            acc[path] = { message: curr.message, type: "validation" };
            return acc;
          }, {}) 
        };
      }
    },
    defaultValues: schemaDefinition.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
  });
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  async function onSubmit(values) {
    setLoading(true);
    try {
      const response = await fetch("/api/addData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: tableName, data: values }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Data added successfully!");
        form.reset();
        router.refresh();
      } else {
        toast.error(result.message || "Failed to add data.");
      }
    } catch (error) {
      toast.error("Error adding data. Try again.");
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-Crimson">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 text-gray-800">
            Add to <span className="text-primary_orange">{decodedTitle}</span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-xl rounded-xl overflow-hidden"
        >
          <div className="bg-primary_orange py-4 px-6">
            <h2 className="text-xl font-semibold text-white">Add New Entry</h2>
          </div>
          
          <div className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {schemaDefinition.map((field) => (
                    <FormField
                      key={field.name}
                      control={form.control}
                      name={field.name}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">{field.label}</FormLabel>
                          <FormControl>
                            <Input 
                              type="text" 
                              placeholder={`Enter ${field.label}`} 
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary_orange focus:ring focus:ring-primary_orange focus:ring-opacity-50"
                              {...formField} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                  <Button 
                    type="button" 
                    onClick={() => form.reset()}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
                    disabled={loading}
                  >
                    Reset
                  </Button>
                  <Button 
                    type="submit" 
                    className="px-6 py-2 bg-primary_orange hover:bg-[#A25942] text-white rounded-md transition-colors"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : "Submit"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
        </motion.p>
      </div>
    </div>
  );
};

export default AddDataForm;