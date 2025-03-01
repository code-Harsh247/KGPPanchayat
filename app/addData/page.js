'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

const page = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const decodedTitle = searchParams.get('title');
    return (
        <div className="w-full flex flex-col items-center font-Crimson">
            <h1 className="text-4xl sm:text-5xl md:text-6xl p-4 text-center">Add to   {decodedTitle}</h1></div>
    )
}

export default page