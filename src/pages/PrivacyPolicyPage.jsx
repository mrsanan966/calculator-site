import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';

const PrivacyPolicyPage = () => {
  useSeo({
    
    
    title: "Privacy Policy | FinCalc - Financial Calculator Tools",
    canonical: "/privacy-policy",
    path: "/privacy-policy",
    description: "Comprehensive Privacy Policy for FinCalc. Learn how we protect your data, handle information collection, and maintain your privacy while using our financial calculator services.",
    keywords: "FinCalc privacy policy, financial calculator privacy, data protection, user privacy, calculator data security, financial tools privacy",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy | FinCalc - Financial Calculator Tools",
      "url": "https://financeloancalc.com/privacy-policy",
      "description": "Comprehensive Privacy Policy for FinCalc. Learn how we protect your data, handle information collection, and maintain your privacy while using our financial calculator services.",
      "publisher": {
        "@type": "Organization",
        "name": "FinCalc",
        "url": "https://financeloancalc.com"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://financeloancalc.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Privacy Policy",
            "item": "https://financeloancalc.com/privacy-policy"
          }
        ]
      }
    }
  });

  return (
    <>
      <Breadcrumbs />
      <div className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto prose dark:prose-invert lg:prose-xl"
        >
          <header className="mb-8 text-center">
            <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-4" />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground">Last Updated: March 19, 2024</p>
          </header>

          <section className="space-y-6">
            <p className="lead">Welcome to FinCalc. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our financial calculator tools and services at financeloancalc.com ("the Service"). Please read this privacy policy carefully. By using our Service, you agree to the collection and use of information in accordance with this policy.</p>

            <h2>1. Information We Collect</h2>
            <p>We collect minimal information necessary to provide and improve our Service. Since our calculators operate client-side and don't require user accounts, our data collection is intentionally limited.</p>
            
            <h3>1.1 Types of Data Collected</h3>
            <h4>Usage Data</h4>
            <p>We collect anonymous usage data to improve our Service, including:</p>
            <ul>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Device type and operating system</li>
              <li>Geographic location (country/region level)</li>
              <li>Referral sources</li>
            </ul>
            <p>This data is collected through Google Analytics and is used in an aggregated, anonymous form to improve our Service.</p>

            <h4>Cookies and Local Storage</h4>
            <p>We use essential cookies and local storage to:</p>
            <ul>
              <li>Remember your calculator preferences</li>
              <li>Maintain your theme preference (light/dark mode)</li>
              <li>Improve page load performance</li>
            </ul>
            <p>We do not use tracking cookies or third-party advertising cookies.</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the collected data for the following purposes:</p>
            <ul>
              <li>To provide and maintain our Service</li>
              <li>To improve user experience and calculator functionality</li>
              <li>To monitor and analyze Service usage patterns</li>
              <li>To detect and prevent technical issues</li>
              <li>To develop new features and tools</li>
            </ul>

            <h2>3. Data Security</h2>
            <p>The security of your information is important to us. We implement appropriate technical and organizational measures to protect your data, including:</p>
            <ul>
              <li>HTTPS encryption for all data transmission</li>
              <li>Regular security assessments</li>
              <li>Limited data collection and retention</li>
              <li>Secure hosting infrastructure</li>
            </ul>
            <p>While we strive to protect your information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security but are committed to protecting your privacy to the best of our ability.</p>

            <h2>4. Data Retention</h2>
            <p>We retain your information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy. Usage data is typically retained for 26 months in Google Analytics, after which it is automatically deleted.</p>

            <h2>5. Third-Party Services</h2>
            <p>We use the following third-party services to operate our Service:</p>
            <ul>
              <li>Google Analytics (for usage analysis)</li>
              <li>Vercel (for hosting and deployment)</li>
            </ul>
            <p>These services have their own privacy policies and may collect information as specified in their respective privacy policies.</p>

            <h2>6. Children's Privacy</h2>
            <p>Our Service is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.</p>

            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li>Right to access your personal information</li>
              <li>Right to correct inaccurate information</li>
              <li>Right to request deletion of your information</li>
              <li>Right to object to processing of your information</li>
              <li>Right to data portability</li>
            </ul>
            <p>To exercise these rights, please contact us using the information provided below.</p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of the Service after any such changes constitutes your acceptance of the new Privacy Policy.</p>

            <h2>9. Contact Information</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <ul className="list-disc list-inside">
              <li>Email: support@financeloancalc.com</li>
              <li>Website: https://financeloancalc.com/contact</li>
            </ul>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">By using FinCalc's Service, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.</p>
            </div>
          </section>
        </motion.div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
  