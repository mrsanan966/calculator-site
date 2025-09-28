import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, DollarSign, TrendingUp, PieChart, GraduationCap, Users, BookOpen, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const calculatorCategories = [
    {
      name: "Home & Mortgage",
      icon: <Home className="h-4 w-4" />,
      items: [
        { name: "Mortgage", path: "/mortgage", description: "Calculate mortgage payments and rates" },
        { name: "Land Loan", path: "/land-loan", description: "Calculate land loan payments" },
        { name: "Refinance", path: "/refinance", description: "Calculate refinancing options" }
      ]
    },
    {
      name: "Loans & Finance",
      icon: <DollarSign className="h-4 w-4" />,
      items: [
        { name: "Loan", path: "/loan", description: "Calculate loan payments and interest" },
        { name: "Auto Loan", path: "/auto-loan", description: "Calculate auto loan payments" },
        { name: "Personal Loan", path: "/personal-loan", description: "Calculate personal loan payments" },
        { name: "Student Loan", path: "/student-loan", description: "Calculate student loan payments" }
      ]
    },
    {
      name: "Business & Investment",
      icon: <TrendingUp className="h-4 w-4" />,
      items: [
        { name: "Finance", path: "/finance", description: "Calculate investment growth" },
        { name: "Margin", path: "/margin", description: "Calculate trading margins" },
        { name: "Profit Margin", path: "/profit-margin", description: "Calculate profit margins" }
      ]
    },
    {
      name: "Tax & Salary",
      icon: <PieChart className="h-4 w-4" />,
      items: [
        { name: "Tax", path: "/tax", description: "Calculate tax estimates" },
        { name: "Salary", path: "/salary", description: "Calculate salary and compensation" },
        { name: "ADP Paycheck", path: "/adp-paycheck", description: "Calculate take-home pay" },
        { name: "Budget", path: "/budget", description: "Plan your monthly budget" }
      ]
    },
    {
      name: "Academic & Utility",
      icon: <GraduationCap className="h-4 w-4" />,
      items: [
        { name: "Grade", path: "/grade", description: "Calculate grades" },
        { name: "GPA", path: "/gpa", description: "Calculate GPA" },
        { name: "Age", path: "/age", description: "Calculate age" },
        { name: "Time", path: "/time", description: "Calculate time differences" }
      ]
    }
  ];

  const companyLinks = [
    { name: "About Us", path: "/about-us", icon: <Users className="mr-2 h-4 w-4" />, description: "Learn about our company" },
    { name: "Contact Us", path: "/contact-us", icon: <BookOpen className="mr-2 h-4 w-4" />, description: "Get in touch with us" },
  ];

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black">
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" aria-label="Home">
            <img src="/logo.png" alt="FinCalc - Finance Loan Calculator Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden lg:flex lg:items-center lg:space-x-1 xl:space-x-2">
            {calculatorCategories.map((category) => (
              <div key={category.name} className="relative" ref={dropdownRef}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-xs font-medium transition-colors hover:text-primary flex items-center px-1.5 py-0.5 rounded-md ${
                    activeDropdown === category.name ? 'bg-accent' : ''
                  }`}
                  aria-expanded={activeDropdown === category.name}
                  aria-haspopup="true"
                  onClick={() => setActiveDropdown(activeDropdown === category.name ? null : category.name)}
                >
                  {category.icon}
                  <span className="ml-1">{category.name}</span>
                  <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${
                    activeDropdown === category.name ? 'rotate-180' : ''
                  }`} />
                </Button>
                <AnimatePresence>
                  {activeDropdown === category.name && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-1 w-64 rounded-lg shadow-2xl bg-background ring-1 ring-black ring-opacity-10 z-50 border"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby={`${category.name}-menu`}
                    >
                      <div className="py-1">
                        {category.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="px-3 py-1.5 text-xs text-foreground hover:bg-accent flex items-center rounded-md transition-colors"
                            role="menuitem"
                            title={item.description}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-[10px] text-muted-foreground">{item.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            
            {/* Divider for company links */}
            <span className="mx-1 h-4 border-l border-muted-foreground/30" />
            {companyLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-medium transition-colors hover:text-primary flex items-center px-1.5 py-0.5 rounded-md ${
                  location.pathname === item.path ? 'text-primary bg-accent' : ''
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
                title={item.description}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden absolute top-16 left-0 w-full bg-background border-b shadow-md"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="container py-4">
                <div className="space-y-4">
                  {calculatorCategories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <button
                        className="flex items-center text-sm font-medium text-muted-foreground w-full"
                        onClick={() => setActiveDropdown(activeDropdown === category.name ? null : category.name)}
                      >
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                        <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${
                          activeDropdown === category.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === category.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-6 space-y-1 overflow-hidden"
                          >
                            {category.items.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className="block px-2 py-1 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setActiveDropdown(null);
                                }}
                              >
                                <div className="font-medium">{item.name}</div>
                                <div className="text-xs text-muted-foreground">{item.description}</div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    {companyLinks.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center px-2 py-1 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
  