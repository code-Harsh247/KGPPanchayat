"use client"
import React, { useState, useRef } from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import CreatorCard from "@/Components/CreatorCard"
import { RefreshCw } from "lucide-react"
import { Button } from "@/Components/ui/btn"
import confetti from 'canvas-confetti'

export default function FAQPage() {
  // Add refreshKey state to trigger re-renders of all creator cards
  const [refreshKey, setRefreshKey] = useState(0)
  // Track the number of contact button clicks
  const [contactClicks, setContactClicks] = useState(0)
  // State to control visibility of creators section
  const [showCreators, setShowCreators] = useState(false)
  // Ref for the creators section to scroll to
  const creatorsRef = useRef(null)

  // Function to refresh all cards
  const refreshAllCards = () => {
    setRefreshKey(prevKey => prevKey + 1)
  }

  // Handle contact support button clicks
  const handleContact = () => {
    const newClickCount = contactClicks + 1
    setContactClicks(newClickCount)
    
    // Reveal creators section after 5 clicks
    if (newClickCount === 5) {
      setShowCreators(true)
      
      // Trigger confetti animation
      triggerConfetti()
      
      // Scroll to creators section after a short delay to ensure it's rendered
      setTimeout(() => {
        creatorsRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }, 300)
    }
  }

  // Function to trigger confetti
  const triggerConfetti = () => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      // Shoot confetti from both sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
  }

  const faqItems = [
    {
      question: "BRO,why am i still single?",
      answer: "Oh, now you wanna act all clueless like you ain't got two whole case studies on why you're here? Let's break it down real quick.Case #1: Miss \"We friends tho\"—this one was never yours, bro. No matter how hard you tried, how many late-night convos you had, or how much emotional unpaid labor you put in, she was always gonna hit you with that \"nah, but you're like my bestie\" card. You thought you were in the race, but you were the pit crew. Painful, I know.Case #2: Shorty you smoked away—now this one? This one was winnable. She was into you, the vibes were there, but you fumbled the bag like a rookie. Maybe you were too nonchalant, maybe you took too long, or maybe you thought she'd just stick around forever. Either way, she's gone now, and you're out here looking at her IG story like it's a highlight reel of what could've been.So yeah, why are you still single? Because life had you playing both sides of the L spectrum—one where you tried too hard, and one where you didn't try at all. But hey, don't stress too much. Your redemption arc is still loading. Just don't fumble the next one"
    },
    {
      question: "Bro, why am I the only one putting in effort while she replies like a government job application?",
      answer: "Ah yes, the good ol' one-sided texting Olympics. You sending paragraphs, jokes, memes, inside references—basically carrying the entire conversation like a broke dude on a first date trying to impress. And what do you get in return?\"Lol.\"\"Haha.\"\"Yeah.\"\"Ikr.\"Like bro, what do you know??? Do you even care?? Do you even want me here?? Because at this point, I feel like I'm just texting a bot with limited responses.And the worst part? She's not even busy. You see her posting stories, online for hours, replying to group chats, tagging her besties in memes—but somehow, when it's you? Suddenly, she has the texting enthusiasm of a Nokia phone.But no, no, let's not jump to conclusions. Maybe she's just not a texting person. Maybe she's just bad at expressing herself through words. Maybe if you just try harder, ask the right questions, be more interesting—Nah. Screw that.You know what it is? She just doesn't care enough. She replies just enough to keep you around, but not enough to make you feel valued. You're not in a conversation, you're in a slow-motion rejection.At some point, you gotta stop texting novels to someone responding with Morse code. If the energy isn't matched, log out, my guy. 🚶‍♂️"
    },
    {
      question: "How do I make her say Yes?",
      answer: "You can't make her say Yes, she is a just a girl :3"
    },
    {
      question: "Why am I alone at night?",
      answer: "Man, night is dangerous. It's like the whole world logs out, but your heart logs in with a flood of emotions that weren't even on your mind during the day. Sunlight kept you distracted, but the second it's just you, your bed, and your thoughts? It's over.Suddenly, you're out here missing people who treated you like an optional side quest.Thinking about conversations that ended months ago.Convincing yourself maybe they did care, just not in a way you understood.But bro, let's be real. If someone wanted to be here, they'd be here. They wouldn't have left you stranded in your own head, replaying memories like a Netflix show you refuse to move on from.And yet, you scroll. You check their profile. You listen to that one song that reminds you of them. Maybe even type out a text—then delete it because you already know the answer.It's not even about them anymore, is it? It's about you. About how you gave, how you tried, how you poured into someone who drank it all up and left you empty. And now, the night just keeps reminding you what it's like to be alone with the echoes of what could've been.But here's the thing—morning always comes. And when it does, you'll be okay again. Until the next 2 AM. 🌙💔"
    },
    {
      question: "What is the purpose of life?",
      answer: "Ah, the age-old question that has kept philosophers, scientists, and overthinkers up at night. People have spent their entire lives chasing the answer, only to realize—oops, they never really figured it out ,But if you ask me? Life's purpose is pretty simple: sipping on some chai while vibing with two suutes. That's it. That's the tweet.Sometimes, you gotta stop overcomplicating things and just enjoy the little moments. 🚬☕"
    },
  ]

  // Creator data with multiple image options for each creator
  const creators = [
    {
      name: "Abhinav",
      description: "\"Bhai pehle toh tu windows install kar le\"",
      images: ["/Images/Abhinav1.jpg", "/Images/Abhinav2.jpg", "/Images/Abhinav3.jpg", "/Images/Abhinav4.jpg", "/Images/Abhinav5.jpg"]
    },
    {
      name: "Ansh",
      description: "\"Arrey windows install kane mai load aata hai\"",
      images: ["/Images/Ansh1.jpg", "/Images/Ansh2.jpg", "/Images/Ansh3.jpg", "/Images/Ansh4.jpg"]
    },
    {
      name: "Harsh",
      description: "Forever Yearning",
      images: ["/Images/Harsh1.jpg", "/Images/Harsh2.jpg", "/Images/Harsh3.jpg", "/Images/Harsh4.jpg"]
    },
    {
      name: "Malav",
      description: "6 ft, curly hair, funny guy (Reads feminist literature for fun)",
      images: ["/Images/Malav1.jpg", "/Images/Malav2.jpg", "/Images/Malav3.jpg", "/Images/Malav4.jpg", "/Images/Malav5.jpg"]
    },
    {
      name: "Sayali",
      description: "Basic Aurat. Got us tea. ONCE.",
      images: ["/Images/Sayali1.jpg", "/Images/Sayali2.jpg", "/Images/Sayali3.jpg", "/Images/Sayali4.jpg"]
    }
  ]

  return (
    <div>
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
          <button 
            onClick={handleContact} 
            className="px-4 py-2 bg-primary_orange text-white rounded hover:bg-secondary_orange transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>

      {showCreators && (
        <div ref={creatorsRef} className="w-full py-16 px-8 bg-gray-50 transition-all duration-500 ease-in-out">
          <div className="container mx-auto">
            <div className="flex justify-center items-center mb-12 relative">
              <h1 className="font-NT text-primary_black text-6xl text-center">Meet the creators!</h1>
              <Button variant="outline" onClick={refreshAllCards} className="absolute right-10">
                <RefreshCw size={20} />
              </Button>
            </div>

            <div className="flex flex-col items-center">
              {/* Card width defined once to ensure consistency */}
              <div className="w-full max-w-5xl">
                {/* First row - 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  {creators.slice(0, 3).map((creator, index) => (
                    <div key={`${index}-${refreshKey}`} className="w-full">
                      <CreatorCard
                        name={creator.name}
                        description={creator.description}
                        images={creator.images}
                      />
                    </div>
                  ))}
                </div>

                {/* Second row - 2 cards (centered) */}
                <div className="w-full flex justify-center">
                  <div className="max-w-[65%] flex gap-8 justify-center">
                    <div className="w-80">
                      <CreatorCard
                        key={`3-${refreshKey}`}
                        name={creators[3].name}
                        description={creators[3].description}
                        images={creators[3].images}
                      />
                    </div>
                    <div className="w-80">
                      <CreatorCard
                        key={`4-${refreshKey}`}
                        name={creators[4].name}
                        description={creators[4].description}
                        images={creators[4].images}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}