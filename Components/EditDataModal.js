"use client";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { tablePrimaryKeys } from "@/lib/Schema";

const EditDataModal = ({ isOpen, onClose, tableName, recordData, title }) => {
  const schemaDefinition = tableSchemas[tableName] || [];
  const router = useRouter();
  const primaryKeyName = tablePrimaryKeys[tableName] || 'id';

  // Initialize form with record data
  const form = useForm({
    defaultValues: schemaDefinition.reduce((acc, field) => {
      // Use existing record data or empty string as fallback
      acc[field.name] = recordData?.[field.name] || "";
      return acc;
    }, {}),
  });

  // Update form values when recordData changes
  useEffect(() => {
    if (recordData) {
      // Reset form with the new record data
      Object.keys(recordData).forEach((key) => {
        form.setValue(key, recordData[key], { shouldValidate: true });
      });
    }
  }, [recordData, form]);

  async function onSubmit(values) {
    try {
      // Ensure we're using the correct primary key for this table
      const primaryKeyValue = recordData[primaryKeyName];

      const response = await axios.put("/api/editRecord", {
        table: tableName,
        data: values,
        primaryKey: {
          field: primaryKeyName,
          value: primaryKeyValue
        }
      });

      if (response.status === 200) {
        toast.success("Data updated successfully!");
        router.refresh();
        onClose(); // Close the modal after successful update
      } else {
        toast.error(response.data.message || "Failed to update data.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating data. Try again.");
    }
  }

  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-Crimson">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-3xl mx-4 overflow-hidden bg-white rounded-xl shadow-2xl"
          >
            <div className="bg-primary_orange py-4 px-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Edit {title}</h2>
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="text-white hover:bg-primary_orange/90"
              >
                ✕
              </Button>
            </div>

            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {schemaDefinition.map((field) => {
                      // Check if this field is the ID field (primary key)
                      const isPrimaryKey = field.name === primaryKeyName;
                      
                      return (
                        <FormField
                          key={field.name}
                          control={form.control}
                          name={field.name}
                          render={({ field: formField }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                {field.label} {isPrimaryKey && "(ID)"}
                              </FormLabel>
                              <FormControl>
                                {isPrimaryKey ? (
                                  <Input
                                    type="text"
                                    className="w-full rounded-md border-gray-300 bg-gray-200 text-gray-600 cursor-not-allowed"
                                    value={formField.value || ""}
                                    disabled={true}
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
                                        <DropdownMenuItem 
                                          key={option} 
                                          onSelect={() => formField.onChange(option)} 
                                          className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                                        >
                                          {option}
                                        </DropdownMenuItem>
                                      ))}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                ) : field.type === "date" ? (
                                  <Input type="date" className="w-full rounded-md border-gray-300" {...formField} />
                                ) : (
                                  <Input 
                                    type={field.type} 
                                    placeholder={`Enter ${field.label}`} 
                                    className="w-full rounded-md border-gray-300" 
                                    {...formField} 
                                  />
                                )}
                              </FormControl>
                              <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                          )}
                        />
                      );
                    })}
                  </div>

                  <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                    <Button 
                      type="button" 
                      onClick={onClose} 
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="px-6 py-2 bg-primary_orange text-white rounded-md" 
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditDataModal;