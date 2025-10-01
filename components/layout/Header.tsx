'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Stem Splitter', href: '/stem-splitter' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Help', href: '/help' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AI Stem Splitter</span>
            </Link>
          </div>
          
          <div className="ml-10 hidden space-x-8 lg:block">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary-600',
                  pathname === item.href
                    ? 'text-primary-600'
                    : 'text-gray-700'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="ml-6 flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-500 cursor-default">
              Sign in
            </span>
            <Link
              href="/stem-splitter"
              className="btn-primary text-sm"
            >
              Start Free Trial
            </Link>
          </div>
          
          <div className="ml-6 lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block px-3 py-2 text-base font-medium transition-colors',
                    pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Guest User</div>
                  <div className="text-sm font-medium text-gray-500">guest@example.com</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <span className="block px-4 py-2 text-base font-medium text-gray-500 cursor-default">
                  Sign in
                </span>
                <Link
                  href="/stem-splitter"
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
