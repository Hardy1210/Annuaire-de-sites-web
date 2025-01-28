'use client'
import { Menu, X } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function NavBar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="ml-3 relative">
                {session?.user ? (
                  <div className="flex items-center">
                    {session?.user?.image && (
                      <Image
                        src={session.user.image}
                        alt="user avatar"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    )}
                    {session.user.image && <span>{session.user.name}</span>}
                    <button onClick={() => signOut()}>Déconnection</button>
                  </div>
                ) : (
                  <Link href="/login">
                    <button>Connection</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              {/* TODO: Integrate with Next Auth */}
              {session?.user ? (
                <div className="flex items-center">
                  {session?.user?.image && (
                    <Image
                      src={session.user.image}
                      alt="user avatar"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  )}
                  {session.user.image && <span>{session.user.name}</span>}
                  <button onClick={() => signOut()}>Déconnection</button>
                </div>
              ) : (
                <Link href="/login">
                  <button>Connection</button>
                </Link>
              )}
            </div>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
