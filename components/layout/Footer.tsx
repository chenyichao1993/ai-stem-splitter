import Link from 'next/link'
import { Zap, Twitter, Github, Mail } from 'lucide-react'

const navigation = {
  product: [
    { name: 'Stem Splitter', href: '/stem-splitter' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'API Documentation', href: null }, // 暂时不可用
    { name: 'Changelog', href: null }, // 暂时不可用
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Status', href: null }, // 暂时不可用
    { name: 'Community', href: null }, // 暂时不可用
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: null }, // 暂时不可用
    { name: 'Careers', href: null }, // 暂时不可用
    { name: 'Press', href: null }, // 暂时不可用
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/aistemsplitter',
      icon: Twitter,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/aistemsplitter',
      icon: Github,
    },
    {
      name: 'Email',
      href: 'mailto:motionjoy93@gmail.com',
      icon: Mail,
    },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI Stem Splitter</span>
            </div>
            <p className="text-sm leading-6 text-gray-300">
              Professional AI-powered audio stem separation tool. Extract vocals, drums, bass, guitar, and piano from any song with high quality and fast processing.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <span className="text-sm leading-6 text-gray-500 cursor-default">
                          {item.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <span className="text-sm leading-6 text-gray-500 cursor-default">
                          {item.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <span className="text-sm leading-6 text-gray-500 cursor-default">
                          {item.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <span className="text-sm leading-6 text-gray-500 cursor-default">
                          {item.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {currentYear} AI Stem Splitter. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
