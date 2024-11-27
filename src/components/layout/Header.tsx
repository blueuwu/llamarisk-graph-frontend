import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed w-full top-0 z-50 bg-[rgb(0,8,16)] border-b border-gray-800">
      <div className="px-4">
        <div className="flex items-center h-20">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/Llama_Risk_Logotype_Symbol_Solid.png"
                alt="Llama Risk Logo"
                width={100}
                height={100}
                priority
              />
            </Link>
            
            <nav className="flex items-center space-x-6">
              <Link href="#" className="text-base font-medium text-gray-300 hover:text-[rgb(253,248,216)]">
                Our Services
              </Link>
              <Link href="#" className="text-base font-medium text-gray-300 hover:text-[rgb(253,248,216)]">
                Research
              </Link>
              <Link href="#" className="text-base font-medium text-gray-300 hover:text-[rgb(253,248,216)]">
                Risk Monitor Portal
              </Link>
              <Link href="#" className="text-base font-medium text-gray-300 hover:text-[rgb(253,248,216)]">
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}