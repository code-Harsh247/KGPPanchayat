"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/inputBox";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/btn";
import {useRouter} from "next/navigation";
import axios from "axios";
import useSQLStore from "@/States/sqlStore";
import { set } from "zod";

const PromptBar = () => {
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [sqlQuery, setSqlQuery] = useState("");
  const router = useRouter();
  const { setGenSqlQuery } = useSQLStore();

  const handleSubmit = async () => {
    const prompt =
      window.innerWidth < 768
        ? textareaRef.current?.value
        : inputRef.current?.value;

    if (!prompt) return;

    setLoading(true);
    setSqlQuery(""); // Reset previous SQL query

    try {
      // Call the AI API to get the SQL query
      const response = await axios.post("/api/ai", { prompt });

      // Extract SQL query from response
      const sql = response.data; // Assuming AI API returns plain text SQL

      setSqlQuery(sql);
      setGenSqlQuery(sql);
      console.log("Generated SQL:", sql);
    } catch (error) {
      console.error("Error getting SQL:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(sqlQuery){
      router.push('/generatedData');
    }
  }, [sqlQuery]);

  return (
    <div className="">
      <div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-2 w-full">
        {/* Show Textarea on Mobile, Input on Larger Screens */}
        <Textarea
          ref={textareaRef}
          placeholder="Ask for any report that you wish to see ..."
          className="font-Crimson min-h-[120px] sm:min-h-[100px] md:hidden"
        />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Ask for any report that you wish to see ..."
          className="font-Crimson hidden md:block"
        />
        <Button onClick={handleSubmit} variant="default" size="lg" className="font-Crimson">
          {loading ? "Generating..." : "Get Report"}
        </Button>
      </div>


    </div>
  );
};

export default PromptBar;
