"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"

const CreatorCard = ({ name, description, images }) => {
  const [currentImage, setCurrentImage] = useState(0)
 
  // Set a random image on initial render
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length)
    setCurrentImage(randomIndex)
  }, [images])

  return (
    <div className="flex flex-col max-w-96 items-center bg-white rounded-lg shadow-md p-4 h-full hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-64 mb-4 overflow-hidden rounded-lg">
        <Image
          src={images[currentImage]}
          alt={`${name} profile`}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-xl font-bold text-primary_black mb-2 font-Crimson">{name}</h3>
      <p className="text-gray-600 text-center font-Crimson">{description}</p>
    </div>
  )
}

export default CreatorCard