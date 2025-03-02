"use client"

import React from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqItems = [
    {
      question: "BRO,why am i still single?",
      answer: "Oh, now you wanna act all clueless like you ain’t got two whole case studies on why you’re here? Let’s break it down real quick.Case #1: Miss “We friends tho”—this one was never yours, bro. No matter how hard you tried, how many late-night convos you had, or how much emotional unpaid labor you put in, she was always gonna hit you with that “nah, but you’re like my bestie” card. You thought you were in the race, but you were the pit crew. Painful, I know.Case #2: Shorty you smoked away—now this one? This one was winnable. She was into you, the vibes were there, but you fumbled the bag like a rookie. Maybe you were too nonchalant, maybe you took too long, or maybe you thought she’d just stick around forever. Either way, she’s gone now, and you’re out here looking at her IG story like it’s a highlight reel of what could’ve been.So yeah, why are you still single? Because life had you playing both sides of the L spectrum—one where you tried too hard, and one where you didn’t try at all. But hey, don’t stress too much. Your redemption arc is still loading. Just don’t fumble the next one"
    },
    {
      question: "Whats the age of Budhia on homepage?",
      answer: "She is just 69 years old "
    },
    {
      question: "How do I make her say Yes?",
      answer: "You can't make her say Yes, she is a just a girl :3"
    },
    {
      question: "Do you offer refunds?",
      answer: "NAI MILEGA :P"
    },
    {
      question: "What is the purpose of life?",
      answer: "Ah, the age-old question that has kept philosophers, scientists, and overthinkers up at night. People have spent their entire lives chasing the answer, only to realize—oops, they never really figured it out ,But if you ask me? Life’s purpose is pretty simple: sipping on some chai while vibing with two suutes. That’s it. That’s the tweet.Sometimes, you gotta stop overcomplicating things and just enjoy the little moments. 🚬☕"
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl font-Crimson">
      <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
      <p className="text-lg text-gray-600 mb-8">Find answers to common questions about YOU :)</p>
      
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-base font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
        <p className="mb-4">Our support team is ready to help you with any other questions you might have.</p>
        <button className="px-4 py-2 bg-primary_orange text-white rounded hover:bg-secondary_orange transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  )
}