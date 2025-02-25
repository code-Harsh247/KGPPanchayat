'use client'
import React, { useRef } from "react";
import { Input } from './ui/input'
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const PromptBar = () => {
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSubmit = () => {
    console.log("Prompt:", 
      window.innerWidth < 768 
        ? textareaRef.current?.value 
        : inputRef.current?.value
    );
  };

  return (
    <div className='absolute bottom-56 sm:bottom-24 md:bottom-0 left-1/2 
        w-[90%] md:w-4/5 lg:w-1/2 
        sm:h-52 md:h-auto 
        -translate-x-1/2 rounded-sm bg-white 
        border-2 border-primary_grey p-3 shadow-lg'>
      
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
        <Button onClick={handleSubmit} variant="default" size="lg" className='font-Crimson'>Get Report</Button>
      </div>

    </div>
  );
}

export default PromptBar;
