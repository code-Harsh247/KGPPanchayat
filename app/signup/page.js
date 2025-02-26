"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/btn";
import { Input } from "@/components/ui/inputBox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

// Schema for Stage 1
const stage1Schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    role: z.enum(["Citizen", "Panchayat Employee", "Government Monitor"]),
});

// Schema for Stage 2 (Citizen)
const citizenSchema = z.object({
    gender: z.enum(["Male", "Female", "Other"]),
    dob: z.string(),
    householdId: z.string().min(5, "Enter a valid Household ID"),
    education: z.string().min(2, "Enter your qualification"),
});

// Schema for Stage 2 (Panchayat Employee)
const employeeSchema = citizenSchema.extend({
    employeeId: z.string().min(3, "Enter a valid Employee ID"),
    employeeRole: z.string().min(2, "Enter your role"),
    joiningDate: z.string(),
});

// Schema for Stage 2 (Government Monitor)
const monitorSchema = z.object({
    jurisdiction: z.string().min(3, "Enter your jurisdiction"),
});

const Signup = () => {
    const [stage, setStage] = useState(1);
    const [role, setRole] = useState("");

    // Stage 1 Form
    const form1 = useForm({
        resolver: zodResolver(stage1Schema),
        defaultValues: { name: "", role: "" },
    });

    // Stage 2 Form (Dynamically assigned)
    const form2Schema =
        role === "Citizen" ? citizenSchema :
            role === "Panchayat Employee" ? employeeSchema :
                monitorSchema;

    const form2 = useForm({
        resolver: zodResolver(form2Schema),
        defaultValues: {},
    });

    const handleStage1Submit = (values) => {
        setRole(values.role);
        setStage(2);
    };

    const handleStage2Submit = (values) => {
        console.log("Final Data:", { ...form1.getValues(), ...values });
        alert("Signup Successful!");
    };

    return (
        <div className="w-screen h-auto flex flex-col items-center justify-center p-6 font-Crimson">
            <div className="w-40 sm:w-60 mb-6">
                <img src="./Images/Welcome-login.svg" alt="Welcome" className="w-full object-contain" />
            </div>
            <motion.div
                key={stage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md bg-white shadow-md p-6 rounded-lg"
            >
                <h2 className="text-xl font-semibold text-center mb-4">Sign Up</h2>

                {/* Stage 1 - Name & Role */}
                {stage === 1 && (
                    <Form {...form1}>
                        <form onSubmit={form1.handleSubmit(handleStage1Submit)} className="space-y-4">
                            <FormField control={form1.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl><Input type="text" placeholder="Enter your name" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form1.control} name="role" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <RadioGroup onValueChange={field.onChange} value={field.value} className="border p-2 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Citizen" id="citizen" />
                                                <Label htmlFor="citizen">Citizen</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Panchayat Employee" id="employee" />
                                                <Label htmlFor="employee">Panchayat Employee</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Government Monitor" id="monitor" />
                                                <Label htmlFor="monitor">Government Monitor</Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />


                            <Button type="submit" className="w-full">Next</Button>
                        </form>
                    </Form>
                )}

                {/* Stage 2 - Based on Role */}
                {stage === 2 && (
                    <Form {...form2}>
                        <form onSubmit={form2.handleSubmit(handleStage2Submit)} className="space-y-4">
                            {/* Common fields for Citizens & Employees */}
                            {(role === "Citizen" || role === "Panchayat Employee") && (
                                <>
                                    <FormField control={form2.control} name="gender" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Gender</FormLabel>
                                            <FormControl>
                                                <RadioGroup onValueChange={field.onChange} value={field.value} className="border p-2 rounded-lg">
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="Male" id="male" />
                                                        <Label htmlFor="male">Male</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="Female" id="female" />
                                                        <Label htmlFor="female">Female</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="Other" id="other" />
                                                        <Label htmlFor="other">Other</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />


                                    <FormField control={form2.control} name="dob" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date of Birth</FormLabel>
                                            <FormControl><Input type="date" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form2.control} name="householdId" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Household ID</FormLabel>
                                            <FormControl><Input type="text" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form2.control} name="education" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Educational Qualification</FormLabel>
                                            <FormControl><Input type="text" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </>
                            )}

                            {/* Panchayat Employee Extra Fields */}
                            {role === "Panchayat Employee" && (
                                <>
                                    <FormField control={form2.control} name="employeeId" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Employee ID</FormLabel>
                                            <FormControl><Input type="text" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form2.control} name="employeeRole" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Employee Role</FormLabel>
                                            <FormControl><Input type="text" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form2.control} name="joiningDate" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Joining Date</FormLabel>
                                            <FormControl><Input type="date" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </>
                            )}

                            {/* Government Monitor Extra Field */}
                            {role === "Government Monitor" && (
                                <FormField control={form2.control} name="jurisdiction" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jurisdiction</FormLabel>
                                        <FormControl><Input type="text" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            )}

                            <div className="flex justify-between">
                                <Button type="button" variant="outline" onClick={() => setStage(1)}>Back</Button>
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </Form>
                )}
            </motion.div>
        </div>
    );
};

export default Signup;
