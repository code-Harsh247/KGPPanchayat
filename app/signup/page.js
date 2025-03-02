"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import axios from "axios";
import { Button } from "@/Components/ui/btn";
import { Input } from "@/Components/ui/inputBox";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Label } from "@/Components/ui/label";
import { useRouter } from "next/navigation";
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
import { Check, ChevronDown, Router } from "lucide-react";

// education_level options
const educationOptions = [
    "Bachelor's Degree",
    "Master's Degree",
    "Technical Certification",
    "High School Diploma",
    "PhD",
    "None"
];

// Schema for Stage 1
const stage1Schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["Citizen", "Panchayat_Employee", "govtMonitors"]),
});

// Schema for Stage 2 (Citizen)
const citizenSchema = z.object({
    gender: z.enum(["Male", "Female", "Other"]),
    date_of_birth: z.string().min(1, "Date of birth is required"),
    household_id: z.coerce.number().int().min(1, "Enter a valid Household ID"),
    education_level: z.string().min(1, "Please select your qualification"),
    income: z.coerce.number().int().positive("Income must be positive"),
    occupation: z.string().min(1, "Enter your occupation")
});

// Schema for Stage 2 (Panchayat Employee)
const employeeSchema = citizenSchema.extend({
    employee_role: z.string().min(2, "Enter your role"),
    joining_date: z.string().min(1, "Joining date is required"),
});

// Schema for Stage 2 (Government Monitor)
const monitorSchema = z.object({
    jurisdiction: z.string().min(3, "Enter your jurisdiction"),
});

const Signup = () => {
    const [stage, setStage] = useState(1);
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    // Stage 1 Form
    const form1 = useForm({
        resolver: zodResolver(stage1Schema),
        defaultValues: { 
            name: "", 
            phone_number: "", 
            role: "", 
            password: "" 
        },
    });

    // Stage 2 Form (Dynamically assigned)
    const form2 = useForm({
        resolver: zodResolver(
            role === "Citizen" ? citizenSchema :
            role === "Panchayat_Employee" ? employeeSchema :
            monitorSchema
        ),
        defaultValues: {
            gender: "",
            date_of_birth: "",
            household_id: undefined,
            education_level: "",
            income: undefined,
            occupation: "",
            employee_role: "",
            joining_date: "",
            jurisdiction: "",
        },
        // Re-validate when role changes
        context: { role }
    });

    // Reset form2 when role changes
    const handleStage1Submit = (values) => {
        setRole(values.role);
        form2.reset({
            gender: "",
            date_of_birth: "",
            household_id: undefined,
            education_level: "",
            income: undefined,
            occupation: "",
            employee_role: "",
            joining_date: "",
            jurisdiction: "",
        });
        setStage(2);
    };

    const handleStage2Submit = async (values) => {
        setLoading(true);
        const requestData = { ...form1.getValues(), ...values };

        try {
            console.log("Submitting:", requestData);
            const response = await axios.post("/api/signUp", requestData);
            toast.success("Signup Successful!");
            console.log("User Created:", response.data);
            router.push('/login');
        } catch (error) {
            console.error("Signup Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.error || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center p-4 font-Crimson bg-gray-50">
            <motion.div
                key={stage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-5xl bg-white shadow-md rounded-lg flex overflow-hidden"
            >
                {/* Left side - Image and Title */}
                <div className="w-1/3 bg-primary_orange p-8 flex flex-col items-center justify-center text-white">
                    <div className="w-48 mb-6">
                        <img src="./Images/logoSignup.svg" alt="Welcome" className="w-full object-contain" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Welcome</h1>
                    <p className="text-center text-blue-100">Create your account to get started</p>
                </div>

                {/* Right side - Form */}
                <div className="w-2/3 p-8">
                    <h2 className="text-xl font-semibold mb-6">Sign Up</h2>

                    {/* Stage 1 - Name & Role */}
                    {stage === 1 && (
                        <Form {...form1}>
                            <form onSubmit={form1.handleSubmit(handleStage1Submit)} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField control={form1.control} name="name" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl><Input type="text" placeholder="Enter your name" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form1.control} name="phone_number" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl><Input type="tel" placeholder="Enter Phone Number" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <FormField control={form1.control} name="password" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl><Input type="password" placeholder="Enter Password" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form1.control} name="role" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <RadioGroup 
                                                onValueChange={field.onChange} 
                                                value={field.value} 
                                                className="flex space-x-4 border p-3 rounded-lg"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Citizen" id="citizen" />
                                                    <Label htmlFor="citizen">Citizen</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Panchayat_Employee" id="employee" />
                                                    <Label htmlFor="employee">Panchayat Employee</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="govtMonitors" id="monitor" />
                                                    <Label htmlFor="monitor">Government Monitor</Label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <div className="pt-4">
                                    <Button type="submit" className="w-full" variant="secondary">Next</Button>
                                </div>
                            </form>
                        </Form>
                    )}

                    {/* Stage 2 - Based on Role */}
                    {stage === 2 && (
                        <Form {...form2}>
                            <form onSubmit={form2.handleSubmit(handleStage2Submit)}>
                                {/* Common fields for Citizens & Employees */}
                                {(role === "Citizen" || role === "Panchayat_Employee") && (
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <FormField control={form2.control} name="gender" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <FormControl>
                                                    <RadioGroup 
                                                        onValueChange={field.onChange} 
                                                        value={field.value} 
                                                        className="flex space-x-4 border p-2 rounded-lg"
                                                    >
                                                        <div className="flex items-center space-x-1">
                                                            <RadioGroupItem value="Male" id="male" />
                                                            <Label htmlFor="male">Male</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <RadioGroupItem value="Female" id="female" />
                                                            <Label htmlFor="female">Female</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <RadioGroupItem value="Other" id="other" />
                                                            <Label htmlFor="other">Other</Label>
                                                        </div>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField control={form2.control} name="date_of_birth" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date of Birth</FormLabel>
                                                <FormControl><Input type="date" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField control={form2.control} name="household_id" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Household ID</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="number" 
                                                        placeholder="Enter Household ID"
                                                        value={field.value || ''} 
                                                        onChange={(e) => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value, 10))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField control={form2.control} name="education_level" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Educational Qualification</FormLabel>
                                                <FormControl>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="outline" className="w-full justify-between">
                                                                {field.value || "Select qualification"}
                                                                <ChevronDown className="ml-2 h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent className="w-56">
                                                            {educationOptions.map((option) => (
                                                                <DropdownMenuItem
                                                                    key={option}
                                                                    onClick={() => field.onChange(option)}
                                                                    className="flex items-center justify-between"
                                                                >
                                                                    {option}
                                                                    {field.value === option && <Check className="ml-2 h-4 w-4" />}
                                                                </DropdownMenuItem>
                                                            ))}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        
                                        <FormField control={form2.control} name="occupation" render={({field})=>(
                                            <FormItem>
                                                <FormLabel>Occupation</FormLabel>
                                                <FormControl><Input type="text" placeholder="Enter your occupation" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}></FormField>

                                        <FormField control={form2.control} name="income" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Annual Income</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="number" 
                                                        placeholder="Enter annual income"
                                                        value={field.value || ''} 
                                                        onChange={(e) => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value, 10))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                )}

                                {/* Panchayat Employee Extra Fields */}
                                {role === "Panchayat_Employee" && (
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <FormField control={form2.control} name="employee_role" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Employee Role</FormLabel>
                                                <FormControl><Input type="text" placeholder="Enter your role" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField control={form2.control} name="joining_date" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Joining Date</FormLabel>
                                                <FormControl><Input type="date" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                )}

                                {/* Government Monitor Extra Field */}
                                {role === "govtMonitors" && (
                                    <div className="mb-4">
                                        <FormField control={form2.control} name="jurisdiction" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Jurisdiction</FormLabel>
                                                <FormControl><Input type="text" placeholder="Enter jurisdiction" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                )}

                                <div className="flex justify-between pt-4">
                                    <Button type="button" variant="outline" onClick={() => setStage(1)}>Back</Button>
                                    <Button type="submit" disabled={loading} varient="secondary">
                                        {loading ? "Submitting..." : "Submit"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;