"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { tableSchemas } from "@/lib/Schema";

const AddDataForm = () => {
  const searchParams = useSearchParams();
  const tableName = searchParams.get("name");
  const decodedTitle = searchParams.get("title");
  const schemaDefinition = tableSchemas[tableName] || [];

  const [nextId, setNextId] = useState(null);
  const [primaryKeyColumn, setPrimaryKeyColumn] = useState(null);

  const router = useRouter();
  const form = useForm({
    defaultValues: schemaDefinition.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {}),
  });

  useEffect(() => {
    async function fetchNextId() {
      try {
        const response = await axios.post(`/api/nextId`, { tableName });
        setNextId(response.data.nextId);
        setPrimaryKeyColumn(response.data.primaryKeyColumn);
        console.log("Next ID:", response.data.nextId);

        // ✅ Dynamically update the field value
        form.setValue(response.data.primaryKeyColumn, response.data.nextId, { shouldValidate: true });
      } catch (error) {
        console.error("Error fetching next ID:", error);
      }
    }
    fetchNextId();
  }, []);

  async function onSubmit(values) {
    try {
      const response = await axios.post("/api/addData", { table: tableName, data: values });

      if (response.status === 201) {
        toast.success("Data added successfully!");
        form.reset();
        router.refresh();
      } else {
        toast.error(response.data.message || "Failed to add data.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding data. Try again.");
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-Crimson">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-xl font-NT sm:text-5xl md:text-6xl font-bold text-center mb-8 text-gray-800">
            Add to <span className="text-primary_orange">{decodedTitle}</span>
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white shadow-xl rounded-xl">
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
                            {field.name === primaryKeyColumn ? (
                              <Input
                                type="text"
                                className="w-full rounded-md border-gray-300 bg-gray-200 text-gray-600 cursor-not-allowed"
                                value={nextId || ""}
                                disabled
                              />
                            ) : field.type === "select" ? (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" className="w-full justify-start">
                                    {formField.value || `Select ${field.label}`}
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full">
                                  {field.options.map((option) => (
                                    <DropdownMenuItem key={option} onSelect={() => formField.onChange(option)} className="cursor-pointer hover:bg-gray-100 px-4 py-2">
                                      {option}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            ) : field.type === "date" ? (
                              <Input type="date" className="w-full rounded-md border-gray-300" {...formField} />
                            ) : (
                              <Input type={field.type} placeholder={`Enter ${field.label}`} className="w-full rounded-md border-gray-300" {...formField} />
                            )}
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                  <Button type="button" onClick={() => form.reset()} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md" disabled={form.formState.isSubmitting}>
                    Reset
                  </Button>
                  <Button type="submit" className="px-6 py-2 bg-primary_orange text-white rounded-md" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddDataForm;
