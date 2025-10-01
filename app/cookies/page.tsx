import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy - AI Stem Splitter',
  description: 'Learn about how AI Stem Splitter uses cookies to improve your experience. Our cookie policy explains what cookies we use and how to manage them.',
  keywords: 'cookie policy, cookies, web tracking, privacy settings, stem splitter cookies',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
              <p className="text-gray-700">Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience and analyze website performance.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Essential Cookies</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Purpose</strong>: Required for basic website functionality</li>
                <li><strong>Examples</strong>: Login status, shopping cart, security features</li>
                <li><strong>Retention</strong>: Session cookies (deleted when browser closes)</li>
                <li><strong>Opt-out</strong>: Not possible (required for service)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Analytics Cookies</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Purpose</strong>: Understand how users interact with our website</li>
                <li><strong>Provider</strong>: Google Analytics (anonymized data)</li>
                <li><strong>Data Collected</strong>: Page views, time spent, user journey</li>
                <li><strong>Retention</strong>: Up to 2 years</li>
                <li><strong>Opt-out</strong>: Available through browser settings</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Functional Cookies</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Purpose</strong>: Remember your preferences and settings</li>
                <li><strong>Examples</strong>: Language preference, theme selection</li>
                <li><strong>Retention</strong>: Up to 1 year</li>
                <li><strong>Opt-out</strong>: Available through browser settings</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Marketing Cookies</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Purpose</strong>: Show relevant advertisements</li>
                <li><strong>Provider</strong>: Google Ads, Facebook Pixel</li>
                <li><strong>Data Collected</strong>: Ad interactions, conversion tracking</li>
                <li><strong>Retention</strong>: Up to 1 year</li>
                <li><strong>Opt-out</strong>: Available through browser settings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Third-Party Cookies</h2>
              <p className="text-gray-700 mb-3">We use third-party services that may set cookies:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Google Analytics</strong>: Website analytics</li>
                <li><strong>Stripe</strong>: Payment processing</li>
                <li><strong>SendGrid</strong>: Email services</li>
                <li><strong>Cloudflare</strong>: Security and performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Managing Cookies</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Browser Settings</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Chrome</strong>: Settings &gt; Privacy and Security &gt; Cookies</li>
                <li><strong>Firefox</strong>: Options &gt; Privacy &amp; Security &gt; Cookies</li>
                <li><strong>Safari</strong>: Preferences &gt; Privacy &gt; Cookies</li>
                <li><strong>Edge</strong>: Settings &gt; Cookies and Site Permissions</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Cookie Consent</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>First visit: Cookie banner with options</li>
                <li>Granular control: Choose which cookies to accept</li>
                <li>Easy access: Cookie settings link in footer</li>
                <li>Withdrawal: Change preferences anytime</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Impact of Disabling Cookies</h2>
              <p className="text-gray-700 mb-3">Disabling certain cookies may affect:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Website functionality</li>
                <li>User experience</li>
                <li>Service personalization</li>
                <li>Analytics accuracy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Updates to This Policy</h2>
              <p className="text-gray-700 mb-3">We may update this Cookie Policy to reflect:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Changes in our practices</li>
                <li>New cookie technologies</li>
                <li>Legal requirements</li>
                <li>User feedback</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
              <p className="text-gray-700 mb-3">For cookie-related questions:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Email: motionjoy93@gmail.com</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
