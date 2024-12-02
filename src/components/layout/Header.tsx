'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '#', text: 'Our Services' },
    { 
      href: '#', 
      text: 'Research',
      mobileSubLinks: [
        { href: '#', text: 'AaveRisk' },
        { href: '#', text: 'LlamaRisk' },
        { href: '#', text: 'PrismaRisk' },
        { href: '#', text: 'YieldNextRisk' },
      ]
    },
    { href: '#', text: 'Risk Monitor Portal' },
    { href: '#', text: 'Contact Us' },
  ]

  return (
    <header className="fixed w-full top-0 z-50 bg-[rgb(0,8,16)] border-b border-gray-800">
      <div className="px-4">
        <div className="flex h-20">
          <div className="flex items-center flex-1">
            <Link href="/" className="flex items-center">
              <Image
                src="/Llama_Risk_Logotype_Symbol_Solid.png"
                alt="Llama Risk Logo"
                width={100}
                height={100}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 ml-8">
              {navLinks.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className="text-base font-medium text-gray-300 hover:text-[rgb(253,248,216)]"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-300 hover:text-[rgb(253,248,216)]"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <div key={link.text}>
                  <Link
                    href={link.href}
                    className="text-base font-medium text-gray-300 hover:text-[rgb(253,248,216)] px-2 py-1 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.text}
                  </Link>
                  
                  {/* Mobile Sub-links for Research */}
                  {link.text === 'Research' && link.mobileSubLinks && (
                    <div className="pl-4 mt-2 space-y-2 border-l border-gray-800 ml-2">
                      {link.mobileSubLinks.map((subLink) => (
                        <Link
                          key={subLink.text}
                          href={subLink.href}
                          className="text-sm font-medium text-gray-400 hover:text-[rgb(253,248,216)] px-2 py-1 block"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subLink.text}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}