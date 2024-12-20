'use client'

import { useState } from 'react'
import Image from 'next/image'

interface SectionContent {
  title: string
  content: string
  image: string // Add an image property
}

const sections: SectionContent[] = [
  {
    title: 'OUR DNA',
    content:
      'the very essence of our concept is the result of an alliance between different cultures. we draw our inspiration not only from our own experience but also from our mixed cultural heritage between south america and europe.',
    image: '/OurAbout/dna.jpg', // Path to the image for "OUR DNA"
  },
  {
    title: 'OUR SOUÉ',
    content:
      'our commitment to authenticity and innovation drives us to create unique experiences that bridge cultural gaps and celebrate diversity.',
    image: '/OurAbout/soue.jpg', // Path to the image for "OUR SOUÉ"
  },
  {
    title: 'OUR VALUES',
    content:
      'we believe in fostering genuine connections, embracing cultural diversity, and creating meaningful experiences that resonate across borders.',
    image: '/OurAbout/values.jpg', // Path to the image for "OUR VALUES"
  },
  {
    title: 'OUR VISION',
    content:
      'to become a global platform that celebrates and connects diverse cultures, creating lasting impact through authentic experiences and meaningful relationships.',
    image: '/OurAbout/vision.jpg', // Path to the image for "OUR VISION"
  },
]

export default function OurAbout() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const activeImage = sections.find((section) => section.title === activeSection)?.image

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-4">
      <div className="relative aspect-[4/3] w-full">
        {/* Display the active image or a default image */}
        <Image
          src={activeImage || '/OurAbout/bg.jpg'} // Default image
          alt="About Us"
          fill
          className="object-cover rounded-lg transition-all duration-300"
          priority
        />
      </div>
      <div className="bg-[#FFF9E8] p-8 rounded-lg">
        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="relative"
              onMouseEnter={() => setActiveSection(section.title)}
              onMouseLeave={() => setActiveSection(null)}
            >
              <h2 className="text-2xl font-bold mb-2 cursor-pointer">
                {section.title}
              </h2>
              {activeSection === section.title && (
                <p
                  className={`text-neutral-700 transform transition-all duration-300 ease-out ${
                    activeSection === section.title
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-2'
                  }`}
                >
                  {section.content}
                </p>
              )}
              <div className="mt-4 border-t border-neutral-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
