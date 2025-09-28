import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';

const TermsOfServicePage = () => {
  useSeo({
    
    
    title: "Terms of Service | FinCalc - Financial Calculator Tools",
    canonical: "/terms-of-service",
    path: "/terms-of-service",
    description: "Comprehensive Terms of Service for FinCalc. Learn about our financial calculator tools, user guidelines, privacy practices, and legal terms for using our financial calculation services.",
    keywords: "FinCalc terms of service, financial calculator terms, loan calculator terms, financial tools terms, calculator usage terms, financial services agreement",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms of Service | FinCalc - Financial Calculator Tools",
      "url": "https://financeloancalc.com/terms-of-service",
      "description": "Comprehensive Terms of Service for FinCalc. Learn about our financial calculator tools, user guidelines, privacy practices, and legal terms for using our financial calculation services.",
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
            "name": "Terms of Service",
            "item": "https://financeloancalc.com/terms-of-service"
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
            <FileText className="mx-auto h-12 w-12 text-primary mb-4" />
            <h1 className="text-4xl font-bold">Terms of Service</h1>
            <p className="text-muted-foreground">Last Updated: March 19, 2024</p>
          </header>

          <section className="space-y-6">
            <p className="lead">Welcome to FinCalc. By accessing and using our financial calculator tools and services at financeloancalc.com ("the Service"), you agree to be bound by these Terms of Service ("Terms"). Please read these terms carefully before using our Service.</p>

            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using FinCalc's Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Service. These Terms constitute a legally binding agreement between you and FinCalc regarding your use of our financial calculator tools and services.</p>

            <h2>2. Financial Calculator Tools and Services</h2>
            <p>FinCalc provides various financial calculator tools designed to help users make informed financial decisions. Our calculators include but are not limited to:</p>
            <ul>
              <li>Loan calculators</li>
              <li>Mortgage calculators</li>
              <li>Investment calculators</li>
              <li>Financial planning tools</li>
            </ul>
            <p>While we strive to provide accurate calculations, our tools are for informational and estimation purposes only. The results should not be considered as financial, investment, legal, or tax advice. We recommend consulting with qualified professionals before making any financial decisions.</p>

            <h2>3. User Responsibilities</h2>
            <p>As a user of FinCalc, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information when using our calculators</li>
              <li>Use the Service in compliance with all applicable laws and regulations</li>
              <li>Not attempt to reverse engineer, decompile, or modify any part of our Service</li>
              <li>Not use our Service for any illegal or unauthorized purposes</li>
              <li>Not interfere with or disrupt the Service or servers connected to the Service</li>
            </ul>

            <h2>4. Intellectual Property Rights</h2>
            <p>All content, features, and functionality of FinCalc, including but not limited to text, graphics, logos, icons, images, calculators, and software, are the exclusive property of FinCalc and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service without our prior written consent.</p>

            <h2>5. Privacy and Data Protection</h2>
            <p>Your privacy is important to us. Our collection and use of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our Service, you consent to our collection and use of your information as described in our Privacy Policy.</p>

            <h2>6. Disclaimer of Warranties</h2>
            <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, FINCALC DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
            <p>We do not warrant that the Service will be uninterrupted, secure, or error-free, that defects will be corrected, or that the Service or servers that make it available are free of viruses or other harmful components.</p>

            <h2>7. Limitation of Liability</h2>
            <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL FINCALC, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.</p>

            <h2>8. Modifications to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.</p>

            <h2>9. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in the United States.</p>

            <h2>10. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
             <ul className="list-disc list-inside">
              <li>Email: support@financeloancalc.com</li>
              <li>Website: https://financeloancalc.com/contact</li>
            </ul>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">By using FinCalc's Service, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them. If you do not agree to these Terms, please do not use our Service.</p>
            </div>
          </section>
        </motion.div>
      </div>
    </>
  );
};

export default TermsOfServicePage;
  