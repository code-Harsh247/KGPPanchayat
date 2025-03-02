"use client"

import React from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqItems = [
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking the 'Sign Up' button in the top right corner of the page. You will need to provide your name, email address, and create a password to sign up."
    },
    {
      question: "Whats the age of Budhia",
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
      answer: "Lot of people have asked this question and they lived their life without knowing the answer so according to me, the purpose of life ek chai ke saath do suute :)"
    },
    {
      question: "Is my data secure?",
      answer: "NO, we are selling your data to facebook, google and other companies"
    },
    {
      question: "Do you offer technical support?",
      answer: "Yes, our technical support team is available 24/7. You can reach us through live chat, email at support@example.com, or by phone at 1-800-123-4567."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl font-Crimson">
      <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
      <p className="text-lg text-gray-600 mb-8">Find answers to common questions about our products and services.</p>
      
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
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  )
}