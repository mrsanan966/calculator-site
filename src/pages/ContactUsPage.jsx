
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, User, Send, Building, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';

const ContactUsPage = () => {
  useSeo({
    
    
    title: "Contact Us - FinCalc",
    canonical: "/contact-us",
    path: "/contact-us",
    description: "Get in touch with the FinCalc team. We're here to help with your questions or feedback about our financial calculators.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Us | FinCalc",
      "url": "https://financeloancalc.com/contact-us",
      "description": "Contact FinCalc for support, feedback, or inquiries about our financial calculator tools.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://financeloancalc.com/" },
          { "@type": "ListItem", "position": 2, "name": "Contact Us" }
        ]
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://financeloancalc.com/contact-us"
      }
    }
  });

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you shortly.",
      variant: "default",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Breadcrumbs />
      <div className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="text-center mb-12">
            <Mail className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              We'd love to hear from you! Whether you have a question, feedback, or a suggestion, feel free to reach out.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-6 w-6 text-primary" /> Send Us a Message
                </CardTitle>
                <CardDescription>Fill out the form below and we'll respond as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center"><User className="mr-2 h-4 w-4" />Name</Label>
                    <Input id="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center"><Mail className="mr-2 h-4 w-4" />Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="flex items-center"><MessageSquare className="mr-2 h-4 w-4" />Subject</Label>
                    <Input id="subject" placeholder="Regarding..." value={formData.subject} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center"><MessageSquare className="mr-2 h-4 w-4" />Message</Label>
                    <Textarea id="message" placeholder="Your message..." value={formData.message} onChange={handleChange} rows={5} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="mr-2 h-6 w-6 text-primary" /> Our Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">FinCalc Headquarters</h3>
                    <p className="text-muted-foreground">20 Cooper Square, New York, <br />NY 10003, USA</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg flex items-center"><Mail className="mr-2 h-4 w-4 text-primary" />Email Us</h3>
                    <a href="mailto:support@financeloancalc.com" className="text-primary hover:underline">support@financeloancalc.com</a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg flex items-center"><Phone className="mr-2 h-4 w-4 text-primary" />Call Us FinCalc</h3>
                    <p className="text-muted-foreground">585-763-1842</p>
                    <p className="text-xs text-muted-foreground">Mon - Fri, 9 AM - 5 PM (EST)</p>
                  </div>
                </CardContent>
              </Card>
              <div className="text-center text-muted-foreground">
                <p>For technical issues with a specific calculator, please mention the calculator's name in your message.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUsPage;
  
