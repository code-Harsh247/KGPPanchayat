'use client'
import React, { useRef } from "react";
import { Input } from './ui/inputBox'
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/btn";

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
    <div className=''>
      
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
