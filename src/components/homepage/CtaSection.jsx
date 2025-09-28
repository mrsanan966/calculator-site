import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make Smart Financial Decisions?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Start using our calculators today to plan your financial future with confidence.
          </p>
          <Link
            to="/#calculators"
            className="inline-flex items-center justify-center bg-background text-foreground px-6 py-3 rounded-lg font-medium hover:bg-background/90 transition-colors"
          >
            Explore Calculators
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
  