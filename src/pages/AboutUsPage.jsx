
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Zap, Lightbulb, BarChart3, LifeBuoy } from 'lucide-react';
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const AboutUsPage = () => {
  useSeo({
    
    title: "About FinCalc - Our Mission & Values",
    canonical: "/about-us",
    description: "Learn about FinCalc, our mission to provide accessible and accurate financial tools, and our commitment to empowering your financial decisions.",
    path: "/about-us",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About FinCalc | Our Mission and Values",
      "url": "https://financeloancalc.com/about-us",
      "description": "Discover the story behind FinCalc, our dedication to simplifying complex financial calculations, and how we aim to help users achieve financial clarity.",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://financeloancalc.com/about-us"
      },
      "publisher": {
        "@type": "Organization",
        "name": "FinCalc",
        "logo": {
          "@type": "ImageObject",
          "url": "https://financeloancalc.com/logo.png"
        }
      }
    }
  });

  const teamMembers = [
    { name: "Alice Johnson", role: "Lead Developer & Financial Analyst", bio: "Alice combines her passion for technology and finance to create intuitive and powerful calculation tools.", avatarText: "AJ" },
    { name: "Bob Williams", role: "UX/UI Designer", bio: "Bob focuses on creating a seamless and enjoyable user experience across all FinCalc platforms.", avatarText: "BW" },
    { name: "Carol Davis", role: "Content & SEO Specialist", bio: "Carol ensures our content is informative, accurate, and helps users understand complex financial topics.", avatarText: "CD" },
  ];

  const values = [
    { icon: <Zap className="h-10 w-10 text-primary" />, title: "Accuracy", description: "We prioritize precision in all our calculations, ensuring you receive reliable estimates." },
    { icon: <Users className="h-10 w-10 text-primary" />, title: "User-Centric", description: "Our tools are designed with you in mind – easy to use, understand, and access." },
    { icon: <Lightbulb className="h-10 w-10 text-primary" />, title: "Empowerment", description: "We aim to provide knowledge and tools that help you make informed financial decisions." },
    { icon: <BarChart3 className="h-10 w-10 text-primary" />, title: "Clarity", description: "Complex financial concepts are broken down into simple, understandable terms and visuals." },
  ];

  return (
    <>
      <Breadcrumbs />
      <div className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="text-center mb-12 md:mb-16">
            <Users className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About FinCalc</h1>
            <p className="text-muted-foreground mt-3 text-lg max-w-2xl mx-auto">
              Empowering your financial journey with clear, accurate, and easy-to-use calculation tools.
            </p>
          </header>

          <section className="mb-12 md:mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img  alt="Team collaborating on financial charts" class="rounded-lg shadow-xl" src="https://images.unsplash.com/photo-1578098576845-51e4ff4305d5" />
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-3xl font-semibold mb-4 flex items-center"><Target className="mr-3 h-8 w-8 text-primary" />Our Mission</h2>
                <p>
                  At FinCalc, our mission is simple: to demystify finance and empower individuals with the tools they need to make confident financial decisions. We believe that everyone deserves access to clear, accurate, and user-friendly calculators that can help plan for a brighter financial future. Whether you're navigating a <Link to="/mortgage" className="text-primary hover:underline">mortgage</Link>, managing <Link to="/loan" className="text-primary hover:underline">loans</Link>, or planning <Link to="/finance" className="text-primary hover:underline">investments</Link>, FinCalc is here to provide the insights you need.
                </p>
                <p>
                  We strive to be your go-to resource for a wide array of calculations, from complex financial modeling to everyday utility tools like our <Link to="/age" className="text-primary hover:underline">Age Calculator</Link> or <Link to="/grade" className="text-primary hover:underline">Grade Calculator</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16 bg-muted/30 rounded-lg">
            <div className="container">
              <h2 className="text-3xl font-semibold text-center mb-10 md:mb-12">Our Core Values</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-6 bg-background rounded-lg shadow-md"
                  >
                    <div className="flex justify-center mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          <section className="py-12 md:py-16">
             <h2 className="text-3xl font-semibold text-center mb-10 md:mb-12">Meet Our (Fictional) Team</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        viewport={{ once: true }}
                        className="bg-background border border-border/50 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <div className="w-24 h-24 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                            {member.avatarText}
                        </div>
                        <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                        <p className="text-primary text-sm mb-3">{member.role}</p>
                        <p className="text-muted-foreground text-xs">{member.bio}</p>
                    </motion.div>
                ))}
             </div>
          </section>

          <section className="text-center py-12">
            <LifeBuoy className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-semibold mb-4">Ready to Calculate?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Explore our wide range of calculators or get in touch if you have any questions.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild size="lg">
                <Link to="/">View All Calculators</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact-us">Contact Us</Link>
              </Button>
            </div>
          </section>

        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUsPage;
  