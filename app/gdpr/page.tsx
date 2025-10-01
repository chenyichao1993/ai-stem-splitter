import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'GDPR Compliance - AI Stem Splitter',
  description: 'Learn about AI Stem Splitter\'s GDPR compliance and your data protection rights under European privacy regulations.',
  keywords: 'GDPR compliance, data protection, privacy rights, European privacy law, stem splitter GDPR',
}

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">GDPR Compliance Statement</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Our Commitment to GDPR</h2>
              <p className="text-gray-700">AI Stem Splitter is committed to protecting your privacy and personal data in accordance with the General Data Protection Regulation (GDPR) and other applicable data protection laws.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Legal Basis for Processing</h2>
              <p className="text-gray-700 mb-3">We process your personal data based on:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Consent</strong>: For marketing communications and non-essential cookies</li>
                <li><strong>Contract Performance</strong>: To provide our audio separation services</li>
                <li><strong>Legitimate Interest</strong>: For service improvement and security</li>
                <li><strong>Legal Obligation</strong>: To comply with applicable laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Your GDPR Rights</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Right of Access</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Request a copy of your personal data</li>
                <li>Information about how we use your data</li>
                <li>Response within 30 days</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Right to Rectification</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Correct inaccurate personal data</li>
                <li>Complete incomplete information</li>
                <li>Update your account details</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Right to Erasure (&quot;Right to be Forgotten&quot;)</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Delete your personal data</li>
                <li>Remove your account and associated data</li>
                <li>Exceptions for legal obligations</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Right to Restrict Processing</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Limit how we use your data</li>
                <li>Suspend certain processing activities</li>
                <li>Maintain data for legal purposes</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Right to Data Portability</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Export your data in a structured format</li>
                <li>Transfer data to another service</li>
                <li>Machine-readable format (JSON, CSV)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Right to Object</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Opt-out of direct marketing</li>
                <li>Object to processing based on legitimate interest</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Processing Activities</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Audio File Processing</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Purpose</strong>: Provide AI stem separation services</li>
                <li><strong>Legal Basis</strong>: Contract performance</li>
                <li><strong>Retention</strong>: Automatic deletion after processing period</li>
                <li><strong>Security</strong>: Encrypted transmission and processing</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Account Management</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Purpose</strong>: Manage user accounts and subscriptions</li>
                <li><strong>Legal Basis</strong>: Contract performance</li>
                <li><strong>Retention</strong>: Duration of account plus 7 years for tax records</li>
                <li><strong>Security</strong>: Encrypted storage and access controls</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Analytics and Improvement</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Purpose</strong>: Improve service quality and user experience</li>
                <li><strong>Legal Basis</strong>: Legitimate interest</li>
                <li><strong>Retention</strong>: Anonymized data, up to 2 years</li>
                <li><strong>Security</strong>: Aggregated and anonymized data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Transfers</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">International Transfers</h3>
              <p className="text-gray-700 mb-3">Data may be processed outside the EEA. Adequate protection through:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Standard Contractual Clauses (SCCs)</li>
                <li>Adequacy decisions</li>
                <li>Appropriate safeguards</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Third-Party Processors</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Payment processors (Stripe, PayPal)</li>
                <li>Cloud providers (AWS, Cloudflare)</li>
                <li>Analytics services (Google Analytics)</li>
                <li>All processors bound by data processing agreements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Protection Measures</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Technical Safeguards</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Encryption in transit and at rest</li>
                <li>Access controls and authentication</li>
                <li>Regular security audits</li>
                <li>Incident response procedures</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Organizational Safeguards</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Data protection training for staff</li>
                <li>Privacy by design principles</li>
                <li>Regular policy reviews</li>
                <li>Data protection impact assessments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Breach Procedures</h2>
              <p className="text-gray-700 mb-3">In case of a data breach:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Detection</strong>: Automated monitoring and alerts</li>
                <li><strong>Assessment</strong>: Risk evaluation within 24 hours</li>
                <li><strong>Notification</strong>: Supervisory authority within 72 hours</li>
                <li><strong>Communication</strong>: Affected individuals within 72 hours</li>
                <li><strong>Documentation</strong>: Detailed incident records</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Protection Officer</h2>
              <p className="text-gray-700 mb-3">For GDPR-related inquiries:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Email</strong>: motionjoy93@gmail.com</li>
                <li><strong>Response Time</strong>: Within 30 days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Supervisory Authority</h2>
              <p className="text-gray-700">You have the right to lodge a complaint with your local data protection authority if you believe we have not handled your personal data in accordance with GDPR.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Updates to This Statement</h2>
              <p className="text-gray-700 mb-3">We may update this GDPR Compliance Statement to reflect:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Changes in our processing activities</li>
                <li>New legal requirements</li>
                <li>User feedback and best practices</li>
                <li>Service improvements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 mb-3">For GDPR-related questions or to exercise your rights:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Email</strong>: motionjoy93@gmail.com</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
